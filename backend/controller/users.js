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

//  update profile


const updateUser = async (req, res) => {
  const { id } = req.params;
  try {

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json( updatedUser);
  } catch (error) {
    res.status(401).json({message:error.message})
  }

  
  
  
 
  
}


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



// follow

const follow = async (req, res) => {
  try {
    let followerUser = await User.findById(req.body.followId).exec();
    console.log(followerUser, "followers");
    followerUser.followers.push(req.user._id);
    followerUser.followers = [...new Set(followerUser.followers)];
    let res1 = await followerUser.save();

    let user = await User.findById(req.user._id).exec();
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

  let user = await User.findById(req.user._id).exec();
  console.log(user, "user to unfolow");
  user.following = user.following.filter(
    (user) => user.toString() != unfollowerUser.toString()
  );
  user.following = [...new Set(user.following)];
  let res2 = await user.save();

  res.status(200).json(res2);
};

module.exports = {
  getUser,
  updateUser,
  getOtherUser,
  follow,
  unfollow,
};
