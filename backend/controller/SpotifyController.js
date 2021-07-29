const CONSTANTS = require('../../src/constants');

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
exports.createOrGetClient = (spotifyId) => {
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
    spotifyClients[spotifyId] = spotifyApi;
    return spotifyApi;
  }
}

 exports.setClient = (spotifyId, client) => {
  spotifyClients[spotifyId] = client;
}

/**
 * Refreshes access token for spotifyId's client
 * @param {*} spotifyId 
 */
exports.refreshToken = (spotifyId) => {
  const client = spotifyClients[spotifyId];
  client.refreshAccessToken().then((data) => {
    // Save the access token so that it's used in future calls
    client.setAccessToken(data.body['access_token']);
  }, (err) => {
    console.log('Could not refresh access token', err);
  });
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
      const client = this.createOrGetClient(user.spotifyId);
      client.setAccessToken(user.token);
      client.setRefreshToken(user.refreshToken);
      console.log("Successfully loaded user", user.spotifyId);
    })
    console.log(spotifyClients);
  })
}

/**
 * Get amountOfTracks most recent tracks
 * @param {*} spotifyId 
 * @param {*} amountOfTracks 
 */
exports.getTracks = (spotifyId, amountOfTracks) => {
  const client = this.createOrGetClient(spotifyId);
  return client.getTracks(amountOfTracks)
    .then(
      (data) => {
        return data;
      },
      (err) => {
        // Try refreshing access token and try again
        this.refreshToken(spotifyId);

        // Second try with refreshed access token
        return client.getTracks(amountOfTracks).then(
          (data) => { return data },
          (err) => {
            console.log('Something went wrong!', err);
            return err;
          }
        )
      }
    );
};

exports.getMyRecentlyPlayedTracks = (spotifyId, options) => {
  const client = this.createOrGetClient(spotifyId);
  return client
    .getMyRecentlyPlayedTracks(options)
    .then((data) => { return data; }, (err) => {
      // Try refreshing access token and try again
      this.refreshToken(spotifyId);

      // Second try with refreshed access token
      return client
        .getMyRecentlyPlayedTracks(options)
        .then((data) => { return data; }, (err) => {
          console.log('Something went wrong!', err);
          return err;
        })
  });
}