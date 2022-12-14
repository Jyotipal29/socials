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
  } catch (err) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// follow

const follow = async (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
};

//unfollow

const unfollow = async (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
};

module.exports = {
  getUser,
  getUserFriends,
  getOtherUser,
  follow,
  unfollow,
};
