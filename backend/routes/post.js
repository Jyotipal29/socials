const express = require("express");
const router = express.Router();
const {
  createPost,
  getPostById,

  getFeedPosts,
  getMyPosts,
  likePost,
  commentInPost,
  getMyFollowingPosts,
} = require("../controller/posts");
const { protect } = require("../middleware/auth");
router.get("/", protect, getFeedPosts);
router.get("/:id", protect, getPostById);
router.get("/mypost", protect, getMyPosts);
router.get("/followingpost", protect, getMyFollowingPosts);

router.post("/", protect, createPost);
router.put("/comment", protect, commentInPost);

router.patch("/:id/like", protect, likePost);
module.exports = router;
