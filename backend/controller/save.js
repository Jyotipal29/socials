const Post = require("../model/post");
const User = require("../model/user");
const savedPost = require("../model/saved");
const toggleSavePost = async (req, res) => {
  try {
    const post = await SavedPost.findOne({
      user: req.user._id,
      post: req.body,
    });

    if (post) {
      await savedPost.remove();
    } else {
      await SavedPost.create({ user: req.user._id, post: req.body });
    }

    res.status(200).json(savedPost);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getSavedPosts = async (req, res) => {
  try {
    const savedPost = await SavedPost.find({ user: req.user._id })
      .populate("post", "-__v")
      .sort({ savedAt: -1 });
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  toggleSavePost,
  getSavedPosts,
};

