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

exports.getArtistListens = async (spotifyId, listenStats) => {
  // https://stackoverflow.com/questions/1296358/how-to-subtract-days-from-a-plain-date
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const lastWeekTimestamp = lastWeek.toISOString();

  // of the form { trackId: # listens }
  const listens = {};

  Object.entries(listenStats).forEach(([trackId, trackListens]) => {
    // I kinda murked the data so there are nested arrays...
    const flatListens = trackListens.flat(2);
    // Listens that happened after 24 hours ago
    const recentListens = flatListens.filter(
      (listen) => listen > lastWeekTimestamp
    );
    if (recentListens.length) {
      listens[trackId] = recentListens.length;
    }
  });

  // of the form { trackId: artist }
  const artists = {};
  const artistPlaysCounts = {};

  // "tracks" endpoint allows 50 tracks at a time
  chunkedTrackIds = chunkify(Object.keys(listens), 50);

  await Promise.all(
    chunkedTrackIds.map(async (chunk) => {
      const trackData = await SpotifyController.getTracks(spotifyId, chunk);
      trackData.body.tracks.map((track) => {
        artists[track.id] = {
          name: track.artists[0].name,
          id: track.artists[0].id,
        };
      });
    })
  );

  Object.entries(listens).forEach(([trackId, listens]) => {
    const artist = artists[trackId];
    if (!artistPlaysCounts[artist.id]) {
      artistPlaysCounts[artist.id] = { listens, name: artist.name };
    } else {
      artistPlaysCounts[artist.id].listens += listens;
    }
  });

  const artistsSorted = Object.entries(artistPlaysCounts).sort(
    ([_idA, valA], [_idB, valB]) => {
      return valB.listens - valA.listens;
    }
  );

  const topArtistPlays = [];
  artistsSorted.slice(0, 30).forEach(([id, val]) => {
    topArtistPlays.push({
      name: val.name,
      id: id,
      plays: val.listens,
    });
  });

  return topArtistPlays;
};

exports.getTopGenres = async (spotifyId, listenStats) => {
  const topArtistListens = await this.getArtistListens(spotifyId, listenStats);
  const topGenres = {};
  const artistListens = {};
  topArtistListens.forEach((artistInfo) => {
    artistListens[artistInfo.id] = {
      name: artistInfo.name,
      listens: artistInfo.plays,
    };
  });
  const artistData = await SpotifyController.getArtists(
    spotifyId,
    Object.keys(artistListens)
  );

  if (!(artistData && artistData.body && artistData.body.artists)) return;

  artistData.body.artists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      if (!(genre in topGenres)) {
        topGenres[genre] = 0;
      }
      // Add to genre amount that artist was listened to
      topGenres[genre] += artistListens[artist.id].listens;
    });
  });

  return topGenres;
};
