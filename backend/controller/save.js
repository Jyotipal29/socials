const SavedPost = require("../model/saved");
const toggleSavePost = async (req, res) => {
  const {userId, postId} = req.body;
  
  try {
    const savedPost = await SavedPost.findOne({ user: userId, post: postId });

    if (savedPost) {
      await savedPost.remove();
      res.status(200).json({ message: "Post removed from saved posts" });
    } else {
      await SavedPost.create({ user: userId, post: postId });
      res.status(200).json({ message: "Post added to saved posts" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSavedPosts = async (req, res) => {
  console.log(SavedPost);
  try {
    const post = await SavedPost.find({ user: req.user._id })
      .populate("post", "-__v")
      .sort({ savedAt: -1 });
    res.status(200).json(post);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  toggleSavePost,
  getSavedPosts,
};
