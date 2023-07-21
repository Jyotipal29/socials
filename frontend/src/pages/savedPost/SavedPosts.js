import React, { useEffect, useState } from "react";
import "./SavedPosts.css";
import FadeLoader from "react-spinners/FadeLoader";
import { useUser } from "../../context/userContext/context";
import axios from "axios";
import { api } from "../../constants/api";
import Post from "../post/Post";
import { usePost } from "../../context/postContext/context";

const SavedPosts = () => {
  const [loading, setLoading] = useState(false);
const [saveState, setSaveState] = useState({
  id: null,
  isLoading: false,
});

const { token } = useUser();
const {
  postState: { savedPost },
  postDispatch,
} = usePost();
useEffect(() => {}, []);
const getAllSavedPost = async () => {
  setLoading(true);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${api}save/savedPost`, config);
    const post = data.map((item) => item.post);
    postDispatch({ type: "SAVE", payload: post });
    setLoading(false);
  } catch (error) {
    console.log(error, "error");
  }
};

useEffect(() => {
  getAllSavedPost();
}, []);
return (
  <div className="saved-container">
    {loading ? (
      <div className="loader">
        <FadeLoader
          color="blue"
          height={10}
          speedMultiplier={2}
          width={1}
          margin={5}
          loading={loading}
        />
      </div>
    ) : (
      savedPost.map((item) => <Post item={item} />)
    )}
  </div>
);
};

export default SavedPosts;
