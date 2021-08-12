/**
 * A group of functions to process user data and generate insights
 */

const { chunkify } = require("../util");
const SpotifyController = require("./SpotifyController");

exports.getMinutesListened = async (spotifyId, listenStats) => {
  const { chunkedTrackIds, listens } = await getChunckedTrackIds(listenStats);

  // of the form { trackId: duration_ms }
  const trackDurations = {};

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
  const { chunkedTrackIds, listens } = await getChunckedTrackIds(listenStats);

  // of the form { trackId: artist }
  const artists = {};
  const artistPlaysCounts = {};

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

  let total = 0;

  artistData.body.artists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      if (!(genre in topGenres)) {
        topGenres[genre] = 0;
      }
      // Add to genre amount that artist was listened to
      topGenres[genre] += artistListens[artist.id].listens;
      total += artistListens[artist.id].listens;
    });
  });

  // Normalize amount
  Object.keys(topGenres).forEach((genre) => {
    topGenres[genre] = roundNum(topGenres[genre] / total);
  });

  return topGenres;
};

exports.getMusicStats = async (spotifyId, listenStats) => {
  const { chunkedTrackIds } = await getChunckedTrackIds(listenStats);

  // Features of a song
  const features = new Set([
    "danceability",
    "energy",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "valence",
  ]);

  // of the form { songType: value }
  // Eg. { danceability: 0.4, energy: 0.6 }
  const songInfo = {};
  let tracks = 0;

  await Promise.all(
    chunkedTrackIds.map(async (chunk) => {
      const trackData = await SpotifyController.getAudioFeaturesForTracks(
        spotifyId,
        chunk
      );
      trackData.body.audio_features.forEach((track) => {
        if (!track) return;
        tracks += 1;
        Object.entries(track).forEach(([feature, value]) => {
          // Track contains other information that we don't need so only check if it a feature we care about
          if (features.has(feature)) {
            if (!(feature in songInfo)) {
              songInfo[feature] = 0;
            }
            songInfo[feature] += Number(value);
          }
        });
      });
    })
  );

  Object.keys(songInfo).forEach((feature) => {
    songInfo[feature] = roundNum(songInfo[feature] / tracks);
  });

  const songFeatures = Object.keys(songInfo).map((feature) => ({
    feature,
    value: songInfo[feature],
  }));

  return songFeatures;
};

const getChunckedTrackIds = async (listenStats) => {
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

  // "tracks" endpoint allows 50 tracks at a time
  const chunkedTrackIds = chunkify(Object.keys(listens), 50);
  return { chunkedTrackIds, listens };
};

const roundNum = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};
