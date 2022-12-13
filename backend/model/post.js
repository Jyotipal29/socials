const mongoose = require("mongoose");
const User = require("./user");
const postSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [String],
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
