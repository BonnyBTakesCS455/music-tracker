const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGO } = require('./secret');

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

app.post('/songs', (req, res) => {
  spotifyApi.setAccessToken(req.body.token);
  spotifyApi
    .getMyRecentlyPlayedTracks({
      limit: 10,
    })
    .then(
      (data) => {
        console.log('Your 10 most recently played tracks are:');
        data.body.items.forEach((item) => console.log(item.track.name));
        res.send(data.body.items);
      },
      (err) => {
        console.log('Something went wrong!', err);
        res.err('Token expired');
      }
    );
});
