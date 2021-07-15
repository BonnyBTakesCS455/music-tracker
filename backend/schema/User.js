const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    token: String,
    friendIds: [String],
    topSongIds: [String],
  },
  { timestamps: true }
);

exports.User = mongoose.model('user', userSchema);
