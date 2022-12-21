import React, { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { usePost } from "../../context/postContext/context";
import { useUser } from "../../context/userContext/context";
import { api } from "../../constants/api";
import { Link } from "react-router-dom";
import Post from "../post/Post";
import axios from "axios";
import "./explore.css";

const Explore = () => {
  const [loading, setLoading] = useState(false);

  const {
    postState: { posts },
    postDispatch,
  } = usePost();

  console.log(posts, "posts data");
  const {
    userState: { user },
    userDispatch,
    token,
  } = useUser();

  useEffect(() => {
    getAllFeedPosts();
  }, []);

  const getAllFeedPosts = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${api}post/`, config);
    console.log(data, "feed data");
    postDispatch({
      type: "GET_POSTS",
      payload: data,
    });
    setLoading(false);
  };

  return (
    <div className="explore-container">
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
        posts.map((item) => <Post item={item} />)
      )}
    </div>
  );
};

export default Explore;
