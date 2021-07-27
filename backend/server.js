const CONSTANTS = require('../src/constants');

const express = require('express');
const request = require('request');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGO, SPOTIFY_CLIENT_SECRET } = require('./secret');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const SpotifyWebApi = require('spotify-web-api-node');
const UserController = require('./controller/UserController');
const spotifyApi = new SpotifyWebApi(
  {
    redirectUri: CONSTANTS.REDIRECT_URI,
    clientId: CONSTANTS.CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET
  }
);

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

  console.log('auth options', authOptions);

  await request.post(authOptions, (err, response, body) => {
    if (err) {
      console.log("Something went wrong: ", err);
      res.send(err);
    }
    console.log('body', body);
    spotifyApi.setAccessToken(body['access_token']);
    spotifyApi.setRefreshToken(body['refresh_token']);
    const tokens = {
      accessToken: body['access_token'],
      refreshToken: body['refresh_token']
    }
    console.log('actual tokens', tokens);
    res.send(tokens);
  });
});

app.get('/refreshtoken', async (req, res) => {
  spotifyApi.refreshAccessToken().then((data) => {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    res.send({
      accessToken: data.body['access_token']
    })
  }, (err) => {
    console.log('Could not refresh access token', err);
    res.send(err);
  }
  )
});

app.get('/songs', async (req, res) => {
  const spotifyId = req.query.spotifyId;
  const user = await UserController.directFindUserBySpotifyId(spotifyId)

  if (!user || !user.lastScraped) {
    res.redirect(`/scrape?spotifyId=${req.query.spotifyId}&token=${req.query.token}`)
    return
  }

  const lastScraped = user.lastScraped
  const listenStats = user.listenStats
  console.log('lastScraped', lastScraped)
  const songsSorted = Object.keys(listenStats).sort(function (a, b) { return -(listenStats[a] - listenStats[b]) })
  const topN = songsSorted.slice(0, TOP_N_SONGS_TO_SHOW)
  console.log('topN', topN)


  spotifyApi.setAccessToken(req.query.token);
  spotifyApi
    .getTracks(topN)
    .then(
      async (data) => {
        // console.log(data.body.tracks)
        const trackData = data.body.tracks.map(track => {
          return {
            ...track,
            plays: listenStats[track.id]
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
  const spotifyId = req.query.spotifyId;
  const { lastScraped } = await UserController.directFindUserBySpotifyId(spotifyId)
  console.log('lastScraped', lastScraped)
  spotifyApi.setAccessToken(req.query.token);
  spotifyApi
    .getMyRecentlyPlayedTracks({
      limit: 10,
    })
    .then(
      async (data) => {
        const ids = {}
        data.body.items.forEach(item => {
          const id = `listenStats.${item.track.id}`
          if (ids[id]) {
            ids[id] = ids[id] + 1;
          } else {
            ids[id] = 1
          }
        })
        console.log(ids)
        const newLastScraped = data.body.cursors?.after || lastScraped
        console.log("Updating user last scraped", newLastScraped);
        UserController.directUpdateUserBySpotifyId(spotifyId, { lastScraped: newLastScraped, $inc: ids });
        res.redirect(`/songs?spotifyId=${req.query.spotifyId}&token=${req.query.token}`)
      },
      (err) => {
        console.log('Something went wrong!', err);
        res.send(err);
      }
    );
});

// After successful login, update user in mongoDB
app.get('/me', (req, res) => {
  spotifyApi.setAccessToken(req.query.token);
  spotifyApi
    .getMe()
    .then((data) => {
      UserController.directFindUserBySpotifyId(data.body.id).then(user => {
        if (!user) {
          console.log("No user found, creating new user");
          UserController.directCreateUser({
            name: data.body.display_name,
            spotifyId: data.body.id,
            token: req.query.token,
            refreshToken: req.query.refreshToken
          })
        } else {
          console.log("User found, updating their token");
          UserController.directUpdateUserBySpotifyId(data.body.id, { token: req.query.token });
        }
      });
      res.send(data.body)
    },
      (err) => {
        console.log('Something went wrong!', err);
        res.send(err);
      });
});
