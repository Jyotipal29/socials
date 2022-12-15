const express = require("express");
const router = express.Router();
const {
  getUser,
  // getUserFriends,
  getOtherUser,
  follow,
  unfollow,
} = require("../controller/users");
const { protect } = require("../middleware/auth");
router.get("/:id", protect, getUser);
router.get("/user/:id", protect, getOtherUser);
// router.get("/:id/friends", protect, getUserFriends);
router.put("/follow", protect, follow);
router.put("/unfollow", protect, unfollow);
module.exports = router;
