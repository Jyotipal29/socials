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

  const { token } = useUser();
  const {
    postState: { savedPost },
    postDispatch,
  } = usePost();
  useEffect(() => {}, []);

  useEffect(() => {
    getAllSavedPost();
  }, []);

  const getAllSavedPost = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${api}save/savedPost`, config);
      postDispatch({ type: "SAVE", payload: data });
      setLoading(false);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="saved-container">
      {loading ? (
        <div className="loader">
          <FadeLoader
            color="blue"
            height={100}
            speedMultiplier={2}
            width={1}
            margin={50}
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
