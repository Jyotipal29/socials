const Post = require("../model/post");
const User = require("../model/user");
const mongoose = require("mongoose");

/* CREATE */
const createPost = async (req, res) => {
  const { caption, tags, picturePath } = req.body;
  console.log({ caption, tags, picturePath }, "post");
  const newPost = new Post({
    caption,
    tags,
    postedBy: req.user,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json(error);
  }
};

// /* READ */ all posts
const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().populate("postedBy", "_id name");
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getMyPosts = async (req, res) => {
  try {
    // const { userId } = req.params;
    const post = await Post.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "_id name"
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user.id) return res.json({ message: "Unauthenticated" });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("no post with that id");
    // const { userId } = req.body;
    const post = await Post.findById(id);
    // const isLiked = post.likes.get(userId);
    const index = post.likes.findIndex(
      (id) => id.toString() === req.user.id.toString()
    );

    if (index === -1) {
      //like
      post.likes.push(req.user.id.toString());

      // post.likes.delete(userId);
    } else {
      post.likes = post.likes.filter(
        (id) => id.toString() != req.user.id.toString()
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404);
    throw new Error(err);
  }
};

module.exports = {
  createPost,
  getFeedPosts,
  getMyPosts,
  likePost,
};
