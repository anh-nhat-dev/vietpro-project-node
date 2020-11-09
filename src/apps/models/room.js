const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: ["private", "group"],
      default: "private",
    },
    users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema, "rooms");
