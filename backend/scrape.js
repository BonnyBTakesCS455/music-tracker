const SpotifyController = require("./controller/SpotifyController");
const UserController = require("./controller/UserController");

const scrape = async (spotifyId) => {
  const { lastScraped } = await UserController.directFindUserBySpotifyId(
    spotifyId
  );

  return SpotifyController.getMyRecentlyPlayedTracks(spotifyId, {
    limit: 50,
    after: lastScraped || 0,
  }).then(
    async (data) => {
      // Build an object of trackId -> array of timestamps
      const plays = {};
      data.body.items.forEach((item) => {
        const id = `listenStats.${item.track.id}`;
        if (id in plays) {
          plays[id].push(item.played_at);
        } else {
          plays[id] = [item.played_at];
        }
      });

      const newLastScraped = data.body.cursors?.after || lastScraped;
      console.log("Updating user last scraped", newLastScraped);

      // Push does an atomic append to existing plays arrays in db
      UserController.directUpdateUserBySpotifyId(spotifyId, {
        lastScraped: newLastScraped,
        $push: plays,
      });
      return ["success", null];
    },
    (err) => {
      console.log("Something went wrong!");
      return [null, err];
    }
  );
};

module.exports = {
  scrape,
};
