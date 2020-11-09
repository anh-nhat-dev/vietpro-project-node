const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      default: null,
    },
    room_id: {
      type: mongoose.Types.ObjectId,
      ref: "Room",
    },
    author_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema, "messages");
