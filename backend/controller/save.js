const SavedPost = require("../model/saved");
const toggleSavePost = async (req, res) => {
  const { postId } = req.body;

  try {
    const savedPost = await SavedPost.findOne({
      user: req.user._id,
      post: postId,
    });

    if (savedPost) {
      await savedPost.remove();
      res.status(200).json({ message: "Post removed from saved posts" });
    } else {
      await SavedPost.create({ user: req.user._id, post: postId });
      res.status(200).json({ message: "Post added to saved posts" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSavedPosts = async (req, res) => {
  try {
    const post = await SavedPost.find({ user: req.user._id })
      .populate({
        path: "post",
        select: "-__v",
        populate: {
          path: "postedBy",
          select: "_id name picturePath",
        },
      })
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
