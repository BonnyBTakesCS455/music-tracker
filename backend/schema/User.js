const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    spotifyId: {
      type: String,
      required: true,
      unique: true,
    },
    token: String,
    refreshToken: String,
    lastScraped: Number,
    friendIds: [String],
    topSongIds: [String],
    listenStats: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

exports.User = mongoose.model('user', userSchema);
