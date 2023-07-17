const Post = require("../model/post");
const User = require("../model/user");
const mongoose = require("mongoose");

/* CREATE */
const createPost = async (req, res) => {
  const { caption, tags, picturePath } = req.body;
  console.log(
    {
      caption,
      tags,
      picturePath,
    },
    "post"
  );
  if (!picturePath) {
    return res.status(400).json({
      message: "picture path required",
    });
  }
  const newPost = new Post({
    caption,
    tags,
    picturePath,
    postedBy: req.user,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// /* READ */ all posts
const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find()
      .populate("postedBy", "_id name picturePath")
      .populate("comments.postedBy", "_id name picturePath");
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//post created by my followiings
const getMyFollowingPosts = async (req, res) => {
  try {
    const followingPosts = await Post.find({
      postedBy: {
        $in: req.user.following,
      },
    })
      .populate("postedBy", " _id name picturePath")
      .sort("createdAt");
    const posts = await Post.find({
      postedBy: req.user._id,
    }).populate("postedBy", " _id name picturePath");
    let allPosts = [];
    followingPosts.forEach((post) => {
      allPosts.push(post);
    });
    posts.forEach((post) => {
      allPosts.push(post);
    });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getMyPosts = async (req, res) => {
  try {
    // const { userId } = req.params;
    const post = await Post.find({
      postedBy: req.user._id,
    }).populate("postedBy", "_id name picturePath");
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

/* UPDATE */
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user._id)
      return res.json({
        message: "Unauthenticated",
      });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("no post with that id like");
    // const { userId } = req.body;
    const post = await Post.findById(id);
    // const isLiked = post.likes.get(userId);
    const index = post.likes.findIndex(
      (id) => id.toString() === req.user._id.toString()
    );

    if (index === -1) {
      //like
      post.likes.push(req.user._id.toString());

      // post.likes.delete(userId);
    } else {
      post.likes = post.likes.filter(
        (id) => id.toString() != req.user._id.toString()
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, {
      new: true,
    }).populate("postedBy", "_id name picturePath");

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const commentPost = async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user.id,
  };
  console.log(comment, req.body.postId);
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: {
        comments: comment,
      },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name picturePath")
    .exec((error, result) => {
      if (error) {
        res.status(422).json({
          message: error.message,
        });
      } else {
        res.json(result);
      }
    });
};

//delete post
const deleteComment = async (req, res) => {
  const postId = req.body.postId;
  const commentId = req.body.commentId;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {
          comments: { _id: commentId },
        },
      },
      { new: true }
    ).populate("comments.postedBy", "_id name picturePath");

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get one post by id

const postById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with the id postbyid");
  try {
    const post = await Post.findById(id).populate(
      "postedBy",
      "_id name picturePath"
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(400).josn({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no video with the id delet");
  const post = await Post.findById(id);
  await post.remove();
  res.status(201).json({ message: "post deleted" });
};

const updatPost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("no post with the id update");
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
module.exports = {
  createPost,
  getFeedPosts,
  getMyPosts,
  likePost,
  commentPost,
  getMyFollowingPosts,
  postById,
  deletePost,
  updatPost,
  deleteComment,
};