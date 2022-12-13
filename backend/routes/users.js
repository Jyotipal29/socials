const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserFriends,
  addRemoveFriend,
} = require("../controller/users");
const { protect } = require("../middleware/auth");
router.get("/:id", protect, getUser);
router.get("/:id/friends", protect, getUserFriends);
router.patch("/:id/:friendId", protect, addRemoveFriend);
module.exports = router;
