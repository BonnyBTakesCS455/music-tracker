const CONSTANTS = require('../src/constants');

const express = require('express');
const request = require('request');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGO, SPOTIFY_CLIENT_SECRET } = require('./secret');
const { scrape } = require('./scrape');

const TOP_N_SONGS_TO_SHOW = 20;

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const UserController = require('./controller/UserController');
const SpotifyController = require('./controller/SpotifyController');
const SpotifyWebApi = require('spotify-web-api-node');

SpotifyController.loadAllClients();

mongoose.set('useFindAndModify', false);
mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/user', UserController.createUser);
app.get('/user/:id', UserController.findUserById);
app.put('/user/:id', UserController.updateUserById);

app.get('/login', async (req, res) => {
  const spotifyApi = new SpotifyWebApi(
    {
      redirectUri: CONSTANTS.REDIRECT_URI,
      clientId: CONSTANTS.CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET
    }
  );
  const authorizeURL = spotifyApi.createAuthorizeURL(Object.values(CONSTANTS.SCOPES), 'example_state');
  console.log('auth url', authorizeURL);
  res.send({ authorizeURL });
})

app.get('/callback', async (req, res) => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    form: {
      code: req.query.code,
      redirect_uri: CONSTANTS.REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(CONSTANTS.CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true
  };

  // Make request back to Spotify API to get access token and refresh token
  request.post(authOptions, async (err, response, body) => {
    if (err) {
      console.log("Something went wrong: ", err);
      res.send(err);
    }

    const tokens = {
      accessToken: body['access_token'],
      refreshToken: body['refresh_token']
    };

    const client = SpotifyControlller.createOrGetClient(data.body.id);
    client.setAccessToken(tokens.accessToken);
    client.setRefreshToken(tokens.refreshToken);

    // Get user info from spotify with new access token
    const data = await client.getMe()
    const user = await UserController.directFindUserBySpotifyId(data.body.id);
    if (!user) {
      console.log("No user found, creating new user");
      UserController.directCreateUser({
        name: data.body.display_name,
        spotifyId: data.body.id,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken
      })
    } else {
      console.log("User found, updating their tokens");
      UserController.directUpdateUserBySpotifyId(data.body.id, { token: tokens.accessToken, refreshToken: tokens.refreshToken });
    }
    res.redirect(`${CONSTANTS.FRONTEND_SERVER}?username=${data.body.display_name}&accessToken=${tokens.accessToken}&spotifyId=${data.body.id}`);
  });
});

app.get('/songs', async (req, res) => {
  const spotifyId = req.query.spotifyId;
  const user = await UserController.directFindUserBySpotifyId(spotifyId)
  if (!user || !user.lastScraped) {
    res.redirect(`/scrape?spotifyId=${req.query.spotifyId}`)
    return
  }
  const listenStats = user.listenStats
  const songsSorted = Object.keys(listenStats).sort(function(a, b) {return -(listenStats[a].length - listenStats[b].length)})
  const topN = songsSorted.slice(0, TOP_N_SONGS_TO_SHOW) 

  SpotifyController.getTracks(spotifyId, topN)
    .then(
      async (data) => {
        const trackData = data.body.tracks.map(track => {
          return {
            ...track,
            plays: listenStats[track.id].length
          }
        })
        res.send(trackData);
      },
      (err) => {
        console.log('Something went wrong!', err);
        res.send(err);
      }
    );
});

app.get('/scrape', async (req, res) => {
  const [success, err] = await scrape(req.query.spotifyId)

  if (success) {
    res.redirect(`/songs?spotifyId=${req.query.spotifyId}`)
  }
  if (err) {
    res.send(err)
  }

});


app.get('/friends', async (req, res) => {
  const user = await UserController.directFindUserBySpotifyId(req.query.id)

  const friends = await Promise.all(user.friendIds.map(async friendId => {
    const userFriend = await UserController.directFindUserBySpotifyId(friendId)

    // find top track
    let topPlays = 0
    let topTrackId = 0

    Object.entries(userFriend.listenStats).forEach(([id, plays]) => {
      if (plays.length > topPlays) {
        topPlays = plays.length
        topTrackId = id
      }
    })

    return {
      name: userFriend.name,
      topTrack: topTrackId
    }
  }))

  res.send(friends)
})
