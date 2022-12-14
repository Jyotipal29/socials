import React, { useEffect, useState } from "react";
import "./SavedPosts.css";
import FadeLoader from "react-spinners/FadeLoader";
import { useUser } from "../../context/userContext/context";
import axios from "axios";
import { api } from "../../constants/api";
import Post from "../post/Post";

const SavedPosts = () => {
  const [loading, setLoading] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);

  const { token } = useUser();

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
      // postDispatch({ type: "SAVE", payload: data });
      setSavedPosts(data);
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
        savedPosts.map((item) => <Post item={item} />)
      )}
    </div>
  );
};

export default SavedPosts;
