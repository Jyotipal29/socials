import React, { useEffect } from "react";
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
  };

  return (
    <div className="explore-container">
      {posts.map((item) => (
        <Post item={item} />
      ))}
    </div>
  );
};

export default Explore;
