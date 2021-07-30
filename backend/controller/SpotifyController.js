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
                return err;
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
              return err;
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

updateAccessToken = (spotifyId, newToken) => {
  console.log('The access token has been refreshed!');

  spotifyClients[spotifyId].setAccessToken(newToken);
  UserController.updateAccessToken(spotifyId, newToken);
}