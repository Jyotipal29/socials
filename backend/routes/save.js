const express = require("express");
const router = express.Router();
const saveController = require("../controller/save");
const { protect } = require("../middleware/auth");

router.post("/toggleSavePost", protect, saveController.toggleSavePost);
router.get("/savedPosts", protect, saveController.getSavedPosts);
module.exports = router;
