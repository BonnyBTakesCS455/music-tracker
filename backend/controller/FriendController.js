const UserController = require("./UserController");
const SpotifyController = require("./SpotifyController");

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

      return {
        name: userFriend.name,
        imgSrc: userFriend.image,
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
