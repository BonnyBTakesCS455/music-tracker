import { setFriendRequests, setFriends } from "./state/management/userSettings";
import store from "./state/store";

export function getSongs(spotifyId) {
  return fetch(`/songs?spotifyId=${spotifyId}`).then(
    (data) => {
      return data.json();
    },
    (err) => {
      console.log("something went wrong", err);
      throw err;
    }
  );
}

export function getRecommendations(spotifyId) {
  return fetch(`/recommendations?spotifyId=${spotifyId}`).then(
    (data) => {
      return data.json();
    },
    (err) => {
      console.log("something went wrong", err);
      throw err;
    }
  );
}

export function getInsights(spotifyId) {
  return fetch(`/insights?spotifyId=${spotifyId}`).then(
    (data) => {
      return data.json();
    },
    (err) => {
      console.log("something went wrong", err);
      throw err;
    }
  );
}

export function createPlaylistWithSongs(
  spotifyId,
  songIds,
  playlistTitle,
  playlistDescription
) {
  const data = {
    spotifyId,
    songIds,
    playlistTitle,
    playlistDescription,
  };
  return fetch(`/createplaylist?spotifyId=${spotifyId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(
    (data) => {
      return data.json();
    },
    (err) => {
      console.log("something went wrong", err);
      throw err;
    }
  );
}

export function login() {
  return fetch("/login").then(
    (data) => {
      return data.json();
    },
    (err) => {
      console.log("Something went wrong ", err);
      throw err;
    }
  );
}

export async function pullFriendRequests(spotifyId) {
  return fetch(`/friend/requests?id=${spotifyId}`).then(
    async (data) => {
      const friendRequests = await data.json();
      if (!friendRequests) return;
      store.dispatch(setFriendRequests(friendRequests));
    },
    (err) => {
      console.log("Something went wrong ", err);
    }
  );
}

export async function pullFriends(spotifyId) {
  return fetch(`/friends?id=${spotifyId}`).then(
    async (data) => {
      const friends = await data.json();
      if (!friends) return;
      store.dispatch(setFriends(friends));
    },
    (err) => {
      console.log("Something went wrong ", err);
    }
  );
}
