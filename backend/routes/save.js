const express = require("express");
const router = express.Router();
const { toggleSavePost, getSavedPosts } = require("../controller/save");
const { protect } = require("../middleware/auth");

router.post("/toggleSavePost", protect, toggleSavePost);
router.get("/savedPost", protect, getSavedPosts);
module.exports = router;
 