const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const app = express()
const port = 3001
app.use(cors());

const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/songs', jsonParser, (req, res) => {
  spotifyApi.setAccessToken(req.body.token);
  spotifyApi.getMyRecentlyPlayedTracks({
    limit : 10
  }).then((data) => {
      console.log("Your 10 most recently played tracks are:");
      data.body.items.forEach(item => console.log(item.track.name));
      res.send(data.body.items);
    }, (err) => {
      console.log('Something went wrong!', err);
      res.err('Token expired');
    });
})