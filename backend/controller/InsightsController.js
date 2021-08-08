/**
 * A group of functions to process user data and generate insights
 */

const { chunkify } = require("../util");
const SpotifyController = require("./SpotifyController");

exports.getMinutesListened = async (spotifyId, listenStats) => {
  // https://stackoverflow.com/questions/1296358/how-to-subtract-days-from-a-plain-date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yestTimestamp = yesterday.toISOString();

  // of the form { trackId: # listens }
  let listens = {};

  Object.entries(listenStats).forEach(([trackId, trackListens]) => {
    // I kinda murked the data so there are nested arrays...
    const flatListens = trackListens.flat(2);
    // Listens that happened after 24 hours ago
    const recentListens = flatListens.filter(
      (listen) => listen > yestTimestamp
    );
    if (recentListens.length) {
      listens[trackId] = recentListens.length;
    }
  });

  // of the form { trackId: duration_ms }
  const trackDurations = {};

  // "tracks" endpoint allows 50 tracks at a time
  chunkedTrackIds = chunkify(Object.keys(listens), 50);

  await Promise.all(
    chunkedTrackIds.map(async (chunk) => {
      const trackData = await SpotifyController.getTracks(spotifyId, chunk);
      trackData.body.tracks.map((track) => {
        trackDurations[track.id] = track.duration_ms;
      });
    })
  );

  let msListened = 0;

  Object.entries(listens).forEach(([trackId, listens]) => {
    msListened += trackDurations[trackId] * listens;
  });

  return Math.floor(msListened / 1000 / 60);
};
