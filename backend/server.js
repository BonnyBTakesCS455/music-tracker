const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGO } = require('./secret');
const { scrape } = require('./scrape');

const TOP_N_SONGS_TO_SHOW = 20;

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const SpotifyWebApi = require('spotify-web-api-node');
const UserController = require('./controller/UserController');
const spotifyApi = new SpotifyWebApi();

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

app.get('/songs', async (req, res) => {
  const spotifyId = req.query.spotifyId;
  const user = await UserController.directFindUserBySpotifyId(spotifyId)

  if (!user || !user.lastScraped) {
    res.redirect(`/scrape?spotifyId=${req.query.spotifyId}&token=${req.query.token}`)
    return
  }

  const listenStats = user.listenStats
  const songsSorted = Object.keys(listenStats).sort(function(a, b) {return -(listenStats[a].length - listenStats[b].length)})
  const topN = songsSorted.slice(0, TOP_N_SONGS_TO_SHOW) 

  spotifyApi.setAccessToken(req.query.token);
  spotifyApi
    .getTracks(topN)
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
  const [success, err] = await scrape(req.query.spotifyId, req.query.token)

  if (success) {
    res.redirect(`/songs?spotifyId=${req.query.spotifyId}&token=${req.query.token}`)
  }
  if (err) {
    res.send(err)
  }

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
            token: req.query.token
          })
        } else {
          console.log("User found, updating their token");
          UserController.directUpdateUserBySpotifyId(data.body.id, {token: req.query.token});
        }
      });
      res.send(data.body)
    },
    (err) => {
      console.log('Something went wrong!', err);
      res.send(err);
    });
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
