const express = require("express");
const router = express.Router();
const {
  createPost,
  getFeedPosts,
  getMyPosts,
  likePost,
} = require("../controller/posts");
const { protect } = require("../middleware/auth");
router.get("/", getFeedPosts);
router.post("/", protect, createPost);
router.get("/mypost", protect, getMyPosts);

/* UPDATE */
router.patch("/:id/like", protect, likePost);
module.exports = router;
