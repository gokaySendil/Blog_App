const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    creator: { type: mongoose.isObjectIdOrHexString, ref: User },
    title: {
      type: String,
      required: [true, "Please add a Title"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Post", postSchema);
