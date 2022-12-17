const Post = require("../model/post");
const User = require("../model/user");

// Read
//get current user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get other user profile

// const getOtherUser = async (req, res) => {
//   User.findOne({ _id: req.params.id })
//     .select("-password")
//     .then((user) => {
//       Post.find({ postedBy: req.params.id })
//         .populate("postedBy", "_id name picturePath")
//         .exec((err, posts) => {
//           if (err) {
//             return res.status(422).json({ error: err });
//           } else {
//             res.json({ user, posts });
//           }
//         })
//         .catch((err) => {
//           return res.status(404).json({ error: "user not found" });
//         });
//     });
// };

const getOtherUser = async (req, res) => {
  try {
    const userid = req.params.id;

    let user = await User.findById(userid).exec();
    let userPosts = await Post.find({ postedBy: userid }).exec();

    res.status(200).json({
      user,
      userPosts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getUserFriends = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     const friends = await Promise.all(
//       user.friends.map((id) => User.findById(id))
//     );
//     const formattedFriends = friends.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return {
//           _id,
//           firstName,
//           lastName,
//           occupation,
//           location,
//           picturePath,
//         };
//       }
//     );
//     res.status(200).json(formattedFriends);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// follow

const follow = async (req, res) => {
  try {
    let followerUser = await User.findById(req.body.followId).exec();
    followerUser.followers.push(req.user.id);
    followerUser.followers = [...new Set(followerUser.followers)];
    let res1 = await followerUser.save();

    let user = await User.findById(req.user.id).exec();
    user.following.push(req.body.followId);
    user.following = [...new Set(user.following)];
    let res2 = await user.save();

    res.status(200).json(res2);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

//unfollow

const unfollow = async (req, res) => {
  let unfollowerUser = req.body.unfollowId;

  let followerUser = await User.findById(unfollowerUser).exec();
  followerUser.followers = followerUser.followers.filter(
    (user) => user.toString() != req.user.id.toString()
  );
  followerUser.followers = [...new Set(followerUser.followers)];
  let res1 = await followerUser.save();

  let user = await User.findById(req.user.id).exec();
  user.following = user.following.filter(
    (user) => user.toString() != unfollowerUser.toString()
  );
  user.following = [...new Set(user.following)];
  let res2 = await user.save();

  res.status(200).json(res2);
};

module.exports = {
  getUser,
  getOtherUser,
  follow,
  unfollow,
};
