const CONSTANTS = require('../../src/constants');
const request = require('request');

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
        clientSecret: CONSTANTS.SPOTIFY_CLIENT_SECRET
      }
    );
    spotifyClients[spotifyId] = {
      client: spotifyApi,
      refreshToken,
      accessToken
    };
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
  const spotifyItem = spotifyClients[spotifyId];
  const client = spotifyItem.client;
  client.setAccessToken(spotifyItem.accessToken);
  return client.getTracks(tracks)
    .then(
      (data) => {
        return data;
      },
      async (err) => {
        // Try refreshing access token and try again
        client.setRefreshToken(spotifyItem.refreshToken);
        client.refreshAccessToken().then(
          (data) => {
            console.log('The access token has been refreshed!');

            // Save the access token so that it's used in future calls
            const newToken = data.body['access_token'];
            client.setAccessToken(newToken);
            UserController.updateAccessToken(spotifyId, newToken);
            spotifyClients[spotifyId].accessToken = newToken;

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
  const spotifyItem = spotifyClients[spotifyId];
  const client = spotifyItem.client;
  client.setAccessToken(spotifyItem.accessToken);
  return client
    .getMyRecentlyPlayedTracks(options)
    .then((data) => { return data; }, async (err) => {
      // Try refreshing access token and try again
      client.setRefreshToken(spotifyItem.refreshToken);
      client.refreshAccessToken().then(
        (data) => {
          console.log('The access token has been refreshed!');

          // Save the access token so that it's used in future calls
          const newToken = data.body['access_token'];
          client.setAccessToken(newToken);
          UserController.updateAccessToken(spotifyId, newToken);
          spotifyClients[spotifyId].accessToken = newToken;

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