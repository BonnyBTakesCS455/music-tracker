const CONSTANTS = require("../constants");
const UserController = require("./UserController");

const SpotifyWebApi = require("spotify-web-api-node");
const { User } = require("../schema/User");

/**
 * Map of all current clients in memory
 */
const spotifyClients = new Map();

/**
 * Create or gets spotifyWebApi for a particular spotifyId
 * @param {*} spotifyId
 * @param {*} accessToken
 * @param {*} refreshToken
 * @returns SpotifyWebApi
 */
exports.createClient = (spotifyId, accessToken, refreshToken) => {
  if (spotifyClients.has(spotifyId)) {
    return spotifyClients[spotifyId];
  } else {
    const spotifyApi = new SpotifyWebApi({
      redirectUri: CONSTANTS.REDIRECT_URI,
      clientId: CONSTANTS.CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      refreshToken,
      accessToken,
    });
    spotifyClients[spotifyId] = spotifyApi;
    return spotifyClients[spotifyId];
  }
};

/**
 * Removes client from in-memory map
 * @param {*} spotifyId
 */
exports.removeClient = (spotifyId) => {
  spotifyClients.delete(spotifyId);
};

/**
 * Loads and creates spotify clients from database
 *
 * If there are a lot of users, probably only add to map once
 * user runs an operation and cull them after they haven't done
 * something in a while
 */
exports.loadAllClients = () => {
  console.log("Spotify: Loading all clients");
  User.find((err, users) => {
    users.forEach(async (user) => {
      await this.createClient(user.spotifyId, user.token, user.refreshToken);
      console.log("Spotify: Successfully loaded client for", user.spotifyId);
    });
  });
};

/**
 * Loads and creates spotify client from database
 * @param {*} spotifyId
 */
exports.loadClient = async (spotifyId) => {
  const users = await User.find({ spotifyId: spotifyId }).exec();
  if (!users) {
    return;
  }
  return Promise.all(
    users.map(async (user) => {
      await this.createClient(user.spotifyId, user.token, user.refreshToken);
      console.log("Spotify: Successfully loaded client for", user.spotifyId);
    })
  );
};

/**
 * Get amountOfTracks most recent tracks
 * @param {*} spotifyId
 * @param {*} tracks list of tracks
 */
exports.getTracks = (spotifyId, tracks) => {
  return spotifyWrapperFunction(spotifyId, "getTracks", [tracks]);
};

/**
 * Gets most recently played tracks
 * @param {*} spotifyId
 * @param {*} options
 * @returns most recent tracks
 */
exports.getMyRecentlyPlayedTracks = (spotifyId, options) => {
  return spotifyWrapperFunction(spotifyId, "getMyRecentlyPlayedTracks", [
    options,
  ]);
};

/**
 * Gets recomendations based on most recently played tracks
 * @param {*} spotifyId
 * @returns list of tracks to recommend user
 */
exports.getRecommendations = async (spotifyId) => {
  const client = spotifyClients[spotifyId];

  // Get most recently played songs
  const recentlyPlayedData = await this.getMyRecentlyPlayedTracks(spotifyId, {
    limit: 5,
  });
  console.log("data", recentlyPlayedData);
  const recentlyPlayedSongs = recentlyPlayedData.body.items;

  // Randomly determine amount of songs to use as seed and amount of artists to use as seed
  // The combination should equal to 5
  const amountOfSongs = Math.floor(Math.random() * 4) + 1;
  const amountOfArtists = 5 - amountOfSongs;
  const artistSeed = [];
  const songSeed = [];

  // Go through songs and add them to artistSeed and songSeed if the lists aren't full
  for (const song of recentlyPlayedSongs) {
    if (artistSeed.length < amountOfArtists) {
      artistSeed.push(song.track.artists[0].id);
    }
    if (songSeed.length < amountOfSongs) {
      songSeed.push(song.track.id);
    }
    if (
      songSeed.length >= amountOfSongs &&
      artistSeed.length >= amountOfArtists
    ) {
      break;
    }
  }

  console.log("song seed", songSeed, "artist seed", artistSeed);

  return spotifyWrapperFunction(spotifyId, "getRecommendations", [
    {
      seed_songs: songSeed,
      seed_artists: artistSeed,
      min_popularity: 20,
      limit: 10,
    },
  ]);
};

/**
 * Creates playlist with playlistTitle and playlistDescription
 * @param {*} spotifyId
 * @param {*} playlistTitle
 * @param {*} playlistDescription
 * @returns
 */
exports.createPlaylist = async (
  spotifyId,
  playlistTitle,
  playlistDescription
) => {
  return spotifyWrapperFunction(spotifyId, "createPlaylist", [
    playlistTitle,
    { description: playlistDescription, public: true },
  ]);
};

/**
 * Adds tracks to playlist with playlistId
 * @param {*} spotifyId
 * @param {*} playlistId
 * @param {*} songIds
 * @returns
 */
exports.addTracksToPlaylist = async (spotifyId, playlistId, songIds) => {
  return spotifyWrapperFunction(spotifyId, "addTracksToPlaylist", [
    playlistId,
    songIds,
  ]);
};

/**
 * Creates a playlist with the songs in songIds
 * @param {*} spotifyId
 * @param {*} songIds
 * @param {*} playlistTitle
 * @param {*} playlistDescription
 * @returns
 */
exports.createPlaylistWithSongs = async (
  spotifyId,
  songIds,
  playlistTitle,
  playlistDescription
) => {
  const playlistData = await this.createPlaylist(
    spotifyId,
    playlistTitle,
    playlistDescription
  );
  const playlistId = playlistData.body.id;
  await this.addTracksToPlaylist(spotifyId, playlistId, songIds);
  // Return original create playlist body because it has better information
  return playlistData;
};

/**
 * Updates access token in mongoDB and in memory for spotifyId
 * @param {string} spotifyId id of spotify account
 * @param {string} newToken new access token for the spotify account
 */
const updateAccessToken = (spotifyId, newToken) => {
  console.log("The access token has been refreshed!");

  spotifyClients[spotifyId].setAccessToken(newToken);
  UserController.updateAccessToken(spotifyId, newToken);
};

/**
 * Runs the spotify client functions
 * If the access token is expired, it will automatically refresh it then try to run the function again
 *
 * func example: if I want to run client.getMe() then func would be 'getMe'
 * args example: if args is [1, 2, 3] then the method would be client.func(1, 2, 3)
 *
 * @param {*} spotifyId id of spotify account
 * @param {string} func name of the method in SpotifyAPI as a string
 * @param {*} args list of args that will be called in func
 */
const spotifyWrapperFunction = async (spotifyId, func, args) => {
  if (!(spotifyId in spotifyClients)) {
    await this.loadClient(spotifyId);
  }
  const client = spotifyClients[spotifyId];
  return client[func](...args).then(
    (data) => {
      return data;
    },
    async (_err) => {
      // Try refreshing access token and try again
      return await client.refreshAccessToken().then(
        (data) => {
          // Save the access token so that it's used in future calls
          updateAccessToken(spotifyId, data.body["access_token"]);

          // Second try with refreshed access token
          return client[func](...args).then(
            (data) => {
              return data;
            },
            (err) => {
              console.log("Something went wrong!", err);
              throw err;
            }
          );
        },
        (err) => {
          console.log("Could not refresh access token", err);
          throw err;
        }
      );
    }
  );
};
