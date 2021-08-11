const UserController = require("./UserController");
const SpotifyController = require("./SpotifyController");

const POGGERS =
  "https://oyster.ignimgs.com/wordpress/stg.ign.com/2021/01/pogchamp.png";

exports.getFriends = async (req, res) => {
  const user = await UserController.directFindUserBySpotifyId(req.query.id);

  if (user === null || user.friendIds === null) {
    res.send([]);
    return;
  }

  const friends = await Promise.all(
    user.friendIds.map(async (friendId) => {
      const userFriend = await UserController.directFindUserBySpotifyId(
        friendId
      );

      // find top track
      let topPlays = 0;
      let topTrackId = 0;

      Object.entries(userFriend.listenStats).forEach(([id, plays]) => {
        if (plays.length > topPlays) {
          topPlays = plays.length;
          topTrackId = id;
        }
      });

      const topTrack = await SpotifyController.getTracks(req.query.id, [
        topTrackId,
      ]).then((data) => {
        const track = data.body.tracks[0];
        return track.name;
      });

      let imageUrl = userFriend.image;
      if (
        imageUrl === undefined ||
        imageUrl === null ||
        imageUrl.length === 0
      ) {
        // Use poggers as placeholder image!
        imageUrl = POGGERS;
      }

      return {
        spotifyId: friendId,
        name: userFriend.name,
        imgSrc: imageUrl,
        topTrack,
      };
    })
  );

  res.send(friends);
};

exports.addFriend = async (req, res) => {
  const spotifyId = req.params.id;
  const friendToAdd = req.body.friendId;
  const userFriend = await UserController.directFindUserBySpotifyId(
    friendToAdd
  );
  if (userFriend) {
    const fieldsToUpdate = {
      $addToSet: {
        friendIds: friendToAdd,
      },
    };
    await UserController.directUpdateUserBySpotifyId(spotifyId, fieldsToUpdate);
    res.send(friendToAdd);
  } else {
    res.sendStatus(404);
  }
};
