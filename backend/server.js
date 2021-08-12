const CONSTANTS = require("./constants");
const express = require("express");
const request = require("request");
const cors = require("cors");
const mongoose = require("mongoose");
const { scrape } = require("./scrape");
const path = require("path");

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

const UserController = require("./controller/UserController");
const FriendController = require("./controller/FriendController");
const SpotifyController = require("./controller/SpotifyController");
const InsightsController = require("./controller/InsightsController");
const SpotifyWebApi = require("spotify-web-api-node");

mongoose.set("useFindAndModify", false);
mongoose
  .connect(process.env.MONGO_SECRET, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB: Connected");
    process.env.NODE_ENV === "production" && SpotifyController.loadAllClients();
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.static("build"));

app.use(function (req, res, next) {
  console.log("INFO:", req.method, req.url, req.body);
  next();
});

app.post("/user", UserController.createUser);
app.get("/user/:id", UserController.findUserById);
app.put("/user/:id", UserController.updateUserById);

app.get("/login", async (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: CONSTANTS.REDIRECT_URI,
    clientId: CONSTANTS.CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });
  const authorizeURL = spotifyApi.createAuthorizeURL(
    Object.values(CONSTANTS.SCOPES),
    "example_state"
  );
  console.log("auth url", authorizeURL);
  res.send({ authorizeURL });
});

app.get("/callback", async (req, res) => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    form: {
      code: req.query.code,
      redirect_uri: CONSTANTS.REDIRECT_URI,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          CONSTANTS.CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  // Make request back to Spotify API to get access token and refresh token
  request.post(authOptions, async (err, response, body) => {
    if (err) {
      console.log("Something went wrong: ", err);
      res.send(err);
    }

    const tokens = {
      accessToken: body["access_token"],
      refreshToken: body["refresh_token"],
    };

    const spotifyApi = new SpotifyWebApi({
      redirectUri: CONSTANTS.REDIRECT_URI,
      clientId: CONSTANTS.CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    spotifyApi.setAccessToken(tokens.accessToken);
    spotifyApi.setRefreshToken(tokens.refreshToken);

    // Get user info from spotify with new access token
    const data = await spotifyApi.getMe();
    const user = await UserController.directFindUserBySpotifyId(data.body.id);
    if (!user) {
      console.log("No user found, creating new user");
      const image =
        data.body.images && data.body.images[0] && data.body.images[0].url
          ? data.body.images[0].url
          : "";
      UserController.directCreateUser({
        name: data.body.display_name,
        spotifyId: data.body.id,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        image: image,
      });
    } else {
      console.log("User found, updating their tokens");
      const image =
        data.body.images && data.body.images[0] && data.body.images[0].url
          ? data.body.images[0].url
          : "";
      UserController.directUpdateUserBySpotifyId(data.body.id, {
        name: data.body.display_name,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        image: image,
      });
    }
    SpotifyController.createClient(
      data.body.id,
      tokens.accessToken,
      tokens.refreshToken
    );
    res.redirect(
      `${CONSTANTS.FRONTEND_SERVER}?username=${data.body.display_name}&accessToken=${tokens.accessToken}&spotifyId=${data.body.id}`
    );
  });
});

app.get("/songs", async (req, res) => {
  const spotifyId = req.query.spotifyId;
  const [success, err] = await scrape(spotifyId);
  if (err) {
    res.status(500).send(err);
  }
  const user = await UserController.directFindUserBySpotifyId(spotifyId);

  const listenStats = user.listenStats ?? {};
  const songsSorted = Object.keys(listenStats).sort(function (a, b) {
    return -(listenStats[a].flat(2).length - listenStats[b].flat(2).length);
  });
  const topN = songsSorted.slice(0, TOP_N_SONGS_TO_SHOW);

  SpotifyController.getTracks(spotifyId, topN).then(
    async (data) => {
      const trackData = data.body.tracks.map((track) => {
        return {
          ...track,
          plays: listenStats[track.id].flat(2).length,
        };
      });
      res.send(trackData);
    },
    (err) => {
      console.log("Something went wrong!", err);
      res.send(err);
    }
  );
});

app.get("/insights/minutes", async (req, res) => {
  const spotifyId = req.query.spotifyId;
  const user = await UserController.directFindUserBySpotifyId(spotifyId);
  const listenStats = user.listenStats ?? {};

  const minutesListened = await InsightsController.getMinutesListened(
    spotifyId,
    listenStats
  );

  res.send({
    minutesListened,
  });
});

app.get("/insights/artists", async (req, res) => {
  const spotifyId = req.query.spotifyId;
  const user = await UserController.directFindUserBySpotifyId(spotifyId);
  const listenStats = user.listenStats ?? {};

  const artistListens = await InsightsController.getArtistListens(
    spotifyId,
    listenStats
  );

  res.send(artistListens);
});

app.get("/recommendations", async (req, res) => {
  const spotifyId = req.query.spotifyId;
  SpotifyController.getRecommendations(spotifyId).then(
    async (data) => {
      const tracks = data.body.tracks;
      res.send(tracks);
    },
    (err) => {
      console.log("Something went wrong!", err);
      res.send(err);
    }
  );
});

app.post("/createplaylist", async (req, res) => {
  const spotifyId = req.query.spotifyId;
  SpotifyController.createPlaylistWithSongs(
    spotifyId,
    req.body.songIds,
    req.body.playlistTitle,
    req.body.playlistDescription
  ).then(
    async (data) => {
      res.send(data);
    },
    (err) => {
      console.log("Something went wrong!", err);
      res.send(err);
    }
  );
});

app.get("/scrape", async (req, res) => {
  const [success, err] = await scrape(req.query.spotifyId);

  if (success) {
    res.redirect(`/songs?spotifyId=${req.query.spotifyId}`);
  }
  if (err) {
    res.send(err);
  }
});

app.get("/friends", FriendController.getFriends);
app.get("/friend/requests", FriendController.getFriendRequests);
app.delete("/friend/request/:id", FriendController.rejectFriendRequest);
app.patch("/friend/request/:id", FriendController.createFriendRequest);
app.patch("/friend/:id", FriendController.acceptFriendRequest);

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "build/index.html", "index.html"));
});
