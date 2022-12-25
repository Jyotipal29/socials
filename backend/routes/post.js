const express = require("express");
const router = express.Router();
const {
  createPost,
  getFeedPosts,
  getMyPosts,
  likePost,
  commentPost,
  getMyFollowingPosts,
  postById,
  deletePost,
  updatPost,
} = require("../controller/posts");
const { protect } = require("../middleware/auth");
router.get("/", protect, getFeedPosts);
router.get("/mypost", protect, getMyPosts);
router.get("/followingpost", protect, getMyFollowingPosts);
router.put("/:id", protect, updatPost);
router.post("/", protect, createPost);
router.patch("/comment", protect, commentPost);
router.get("/:id", protect, postById);
router.delete("/:id", protect, deletePost);
router.patch("/:id/like", protect, likePost);
module.exports = router;
