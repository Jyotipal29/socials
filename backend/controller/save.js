const Post = require("../model/post");
const User = require("../model/user");
const mongoose = require("mongoose");

const toggleSavePost = async (req, res) => {
  try {
    const userid = req.user.id;
    const postid = req.body.postid;

    let user = await User.findById(userid).exec();
    if (user.savedPosts.includes(postid)) {
      user.savedPosts = user.savedPosts.filter(
        (post) => post.toString() != postid.toString()
      );
    } else {
      user.savedPosts.push(postid);
    }

    let usersaved = await user.save();
    res.status(200).json(usersaved);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

const getSavedPosts = async (req, res) => {
  try {
    const userid = req.user.id;
    let user = await User.findById(userid).populate("savedPosts").exec();
    res.status(200).json(user.savedPosts);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

module.exports = {
  toggleSavePost,
  getSavedPosts,
};
