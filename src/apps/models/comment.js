const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: null,
    },
    full_name: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
    prd_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema, "comments");
