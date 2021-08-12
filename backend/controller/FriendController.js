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

exports.getFriendRequests = async (req, res) => {
  const spotifyId = req.query.id;
  const user = await UserController.directFindUserBySpotifyId(spotifyId);
  if (!user) {
    res.sendStatus(404);
    return;
  }

  const friendRequests = await Promise.all(
    user.friendRequestIds.map(async (friendId) => {
      const userFriend = await UserController.directFindUserBySpotifyId(
        friendId
      );

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
      };
    })
  );
  res.send(friendRequests);
};

exports.rejectFriendRequest = async (req, res) => {
  const spotifyId = req.params.id;
  const friendToReject = req.body.friendId;
  const user = await UserController.directFindUserBySpotifyId(spotifyId);
  if (user.friendRequestIds.includes(friendToReject)) {
    const fieldsToUpdate = {
      $pull: {
        friendRequestIds: friendToReject,
      },
    };
    await UserController.directUpdateUserBySpotifyId(spotifyId, fieldsToUpdate);
    res.send(friendToReject);
  } else {
    res.sendStatus(404);
  }
};

exports.acceptFriendRequest = async (req, res) => {
  const spotifyId = req.params.id;
  const friendToAdd = req.body.friendId;
  const user = await UserController.directFindUserBySpotifyId(spotifyId);
  if (user.friendRequestIds.includes(friendToAdd)) {
    const status = await makeThemFriends(spotifyId, friendToAdd);
    if (status !== 404) {
      res.send(friendToAdd);
      return;
    }
  }
  res.sendStatus(404);
};

exports.createFriendRequest = async (req, res) => {
  const spotifyId = req.params.id;
  const friendToAdd = req.body.friendId;
  if (spotifyId === friendToAdd) {
    res.sendStatus(400);
    return;
  }
  const userFriend = await UserController.directFindUserBySpotifyId(
    friendToAdd
  );
  if (userFriend) {
    if (userFriend.friendIds.includes(spotifyId)) {
      res.send(friendToAdd);
      return;
    }

    const user = await UserController.directFindUserBySpotifyId(spotifyId);
    if (user.friendRequestIds.includes(friendToAdd)) {
      const status = await makeThemFriends(spotifyId, friendToAdd);
      if (status !== 404) {
        res.send(friendToAdd);
      } else {
        res.sendStatus(404);
      }
      return;
    }

    const fieldsToUpdate = {
      $addToSet: {
        friendRequestIds: spotifyId,
      },
    };
    await UserController.directUpdateUserBySpotifyId(
      friendToAdd,
      fieldsToUpdate
    );
    res.send(friendToAdd);
  } else {
    res.sendStatus(404);
  }
};

async function makeThemFriends(user1Id, user2Id) {
  const [user1, user2] = await Promise.all([
    UserController.directFindUserBySpotifyId(user1Id),
    UserController.directFindUserBySpotifyId(user2Id),
  ]);
  if (!user1 || !user2) return 404;
  const fieldsToUpdateForUser1 = {
    $addToSet: {
      friendIds: user2Id,
    },
    $pull: {
      friendRequestIds: user2Id,
    },
  };
  const fieldsToUpdateForUser2 = {
    $addToSet: {
      friendIds: user1Id,
    },
    $pull: {
      friendRequestIds: user1Id,
    },
  };
  await Promise.all([
    UserController.directUpdateUserBySpotifyId(user1Id, fieldsToUpdateForUser1),
    UserController.directUpdateUserBySpotifyId(user2Id, fieldsToUpdateForUser2),
  ]);
  return 200;
}
