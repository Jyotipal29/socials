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
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const getSavedPosts = async (req, res) => {
  try {
    const userid = req.user.id;
    let user = await User.findById(userid)
      .populate("savedPosts")
      .populate({
        path: "savedPosts",
        populate: {
          path: "postedBy",
          model: "User",
        },
      })
      .exec();
    res.status(200).json(user.savedPosts);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

module.exports = {
  toggleSavePost,
  getSavedPosts,
};
