module.exports = {
  FRONTEND_SERVER:
    process.env.NODE_ENV === "production"
      ? "https://cpsc-455-music-tracker.herokuapp.com"
      : "http://localhost:3000",
  CLIENT_ID: "c7765adc626d4959ade45fba973c58d1",
  REDIRECT_URI:
    process.env.NODE_ENV === "production"
      ? "https://cpsc-455-music-tracker.herokuapp.com/callback"
      : "http://localhost:5000/callback",
  SCOPES: {
    userReadRecentlyPlayed: "user-read-recently-played",
    userReadCurrentlyPlaying: "user-read-currently-playing",
    playlistModifyPrivate: "playlist-modify-private",
    playlistModifyPublic: "playlist-modify-public",
    playlistReadPrivate: "playlist-read-private",
    userReadEmail: "user-read-email",
    userReadPrivate: "user-read-private",
  },
};
