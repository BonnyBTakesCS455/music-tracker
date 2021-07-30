const CONSTANTS = require('../../src/constants');
const UserController = require('./UserController');

const SpotifyWebApi = require('spotify-web-api-node');
const { User } = require('../schema/User');

/**
 * Map of all current clients in memory
 */
const spotifyClients = new Map();

/**
 * Create or gets spotifyWebApi for a particular spotifyId
 * @param {*} spotifyId 
 * @returns SpotifyWebApi
 */
exports.createClient = (spotifyId, accessToken, refreshToken) => {
  if (spotifyClients.has(spotifyId)) {
    return spotifyClients[spotifyId];
  } else {
    const spotifyApi = new SpotifyWebApi(
      {
        redirectUri: CONSTANTS.REDIRECT_URI,
        clientId: CONSTANTS.CLIENT_ID,
        clientSecret: CONSTANTS.SPOTIFY_CLIENT_SECRET,
        refreshToken,
        accessToken
      }
    );
    spotifyClients[spotifyId] = spotifyApi;
    return spotifyClients[spotifyId];
  }
}

exports.removeClient = (spotifyId) => {
  spotifyClients.delete(spotifyId);
}

/**
 * Loads and creates spotify clients from database
 * 
 * If there are a lot of users, probably only add to map once
 * user runs an operation and cull them after they haven't done
 * something in a while
 */
exports.loadAllClients = () => {
  User.find((err, users) => {
    users.forEach((user) => {
      const spotifyItem = this.createClient(user.spotifyId, user.token, user.refreshToken);
      console.log("Successfully loaded user", spotifyItem);
    });
  })
}

/**
 * Get amountOfTracks most recent tracks
 * @param {*} spotifyId 
 * @param {*} amountOfTracks 
 */
exports.getTracks = (spotifyId, tracks) => {
  const client = spotifyClients[spotifyId];
  return client.getTracks(tracks)
    .then(
      (data) => {
        return data;
      },
      async (_err) => {
        // Try refreshing access token and try again
        return await client.refreshAccessToken().then(
          (data) => {
            // Save the access token so that it's used in future calls
            updateAccessToken(spotifyId, data.body['access_token']);

            // Second try with refreshed access token
            return client.getTracks(tracks).then(
              (data) => { return data },
              (err) => {
                console.log('Something went wrong!', err);
                throw err;
              }
            );
          },
          (err) => {
            console.log('Could not refresh access token', err);
            throw err;
          }
        );
      }
    );
};

/**
 * Gets most recently played tracks
 * @param {*} spotifyId 
 * @param {*} options 
 * @returns most recent tracks
 */
exports.getMyRecentlyPlayedTracks = (spotifyId, options) => {
  const client = spotifyClients[spotifyId];
  return client
    .getMyRecentlyPlayedTracks(options)
    .then((data) => { return data; }, async (_err) => {
      // Try refreshing access token and try again
      return await client.refreshAccessToken().then(
        (data) => {
          // Save the access token so that it's used in future calls
          updateAccessToken(spotifyId, data.body['access_token']);

          // Second try with refreshed access token
          return client.getMyRecentlyPlayedTracks(options).then(
            (data) => { return data },
            (err) => {
              console.log('Something went wrong!', err);
              throw err;
            }
          );
        },
        (err) => {
          console.log('Could not refresh access token', err);
          throw err;
        }
      );
    });
}

/**
 * Gets recomendations based on most recently played tracks
 * @param {*} spotifyId 
 * @returns list of tracks to recommend user
 */
exports.getRecommendations = async (spotifyId) => {
  const client = spotifyClients[spotifyId];

  // Get most recently played songs
  const recentlyPlayedData = await this.getMyRecentlyPlayedTracks(spotifyId, { limit: 5 });
  console.log('data', recentlyPlayedData)
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
    if (songSeed.length >= amountOfSongs && artistSeed.length >= amountOfArtists) {
      break;
    }
  }

  console.log('song seed', songSeed, 'artist seed', artistSeed);

  return client.getRecommendations({
    seed_songs: songSeed,
    seed_artists: artistSeed,
    min_popularity: 20,
    limit: 10
  }).then(
    (data) => { return data; },
    (_err) => {
      console.log('Something went wrong!', err);
      throw err;
    });
}

/**
 * Gets recomendations based on most recently played tracks
 * @param {*} spotifyId 
 * @returns list of tracks to recommend user
 */
 exports.createPlaylistWithSongs = async (spotifyId, songIds, playlistTitle, playlistDescription) => {
  const client = spotifyClients[spotifyId];
  const data = await client.createPlaylist(playlistTitle, {'description': playlistDescription, 'public': true})
    .then((data) => { console.log("done creating playlist"); return data; }, async (_err) => {
      // Try refreshing access token and try again
      return await client.refreshAccessToken().then(
        (data) => {
          // Save the access token so that it's used in future calls
          updateAccessToken(spotifyId, data.body['access_token']);

          // Second try with refreshed access token
          return client.createPlaylist(playlistTitle, {'description': playlistDescription, 'public': true}).then(
            (data) => { console.log("done creating playlist"); return data; },
            (err) => {
              console.log('Something went wrong!', err);
              throw err;
            }
          );
        },
        (err) => {
          console.log('Could not refresh access token', err);
          throw err;
        }
      );
    });
  const playlistData = data;
  const linkToPlaylist = data.body.external_urls.spotify;
  const playlistId = data.body.id;
  console.log("link", linkToPlaylist, "playlist id", playlistId);
  return await client.addTracksToPlaylist(playlistId, songIds).then(
    (_data) => {
      return playlistData;
    }, (err) => {
      console.log('Something went wrong!', err);
      throw err;
    }
  )
}

updateAccessToken = (spotifyId, newToken) => {
  console.log('The access token has been refreshed!');

  spotifyClients[spotifyId].setAccessToken(newToken);
  UserController.updateAccessToken(spotifyId, newToken);
}