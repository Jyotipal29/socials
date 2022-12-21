const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  getOtherUser,
  follow,
  unfollow,
} = require("../controller/users");
const { protect } = require("../middleware/auth");
router.get("/:id", protect, getUser);
router.patch("/update/:id", protect, updateUser);
router.get("/user/:id", protect, getOtherUser);
router.put("/follow", protect, follow);
router.put("/unfollow", protect, unfollow);
module.exports = router;
 