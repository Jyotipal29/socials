import React, { useEffect, useState } from "react";
import "./post.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { usePost } from "../../context/postContext/context";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/userContext/context";
import { api } from "../../constants/api";
const Post = (item) => {
  console.log(item, "all data in obj");
  const [showComm, setShowComm] = useState(false);
  const [commText, setCommText] = useState(" ");
  const [data, setData] = useState([]);
  const {
    postState: { posts },
    postDispatch,
  } = usePost();
  const {
    userState: { user },
    token,
  } = useUser();
  // console.log(posts, "posts");

  //like
  const likeHandler = async (id) => {
    console.log(id, "id");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.patch(`${api}post/${id}/like`, {}, config);
      console.log(data, "like data");
      postDispatch({
        type: "LIKE_POST",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // comment
  const commentClickHandler = () => {
    setShowComm((prev) => !prev);
  };

  // commment
  const commentHandler = async (postId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${api}post/comment`,
        { postId, commText },
        config
      );
      // console.log(data, "comment data");
      setCommText(" ");
    } catch (error) {
      console.log(error);
    }
  };

  // delete handler
  const deleteHandler = async (id) => {
    // try {
    //     const config = {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //   };
    //   await axios.delete(`${api}`)
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // save handler

  const saveHandler = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${api}save/toggleSavePost`,
      { postid: id },
      config
    );

    postDispatch({
      type: "TOGGEL_SAVE",
      payload: data,
    });
    // console.log(data, "saved data");
  };
  return (
    <div className="feed-post-container">
      <div className="post-card">
        <Link
          to={
            item.item.postedBy._id !== user._id
              ? `/profile/${item.item.postedBy._id}`
              : "/profile"
          }
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div className="post-profile-details">
            <img src={item.item.postedBy.picturePath} />
            <p className="post-user-name">{item.item.postedBy.name}</p>
          </div>
        </Link>

        <div className="post-details">
          <img src={item.item.picturePath} />
          <small className="post-caption">
            <strong style={{ color: "#0f172a" }}>
              {item.item.postedBy.name}{" "}
            </strong>
            {item.item.caption}
          </small>
          <small className="post-tags">
            {item.item.tags.map((tag) => `#${tag} `)}
          </small>
        </div>
        <div className="post-btn">
          <button
            className="btn post-like-btn"
            onClick={() => likeHandler(item.item._id)}
          >
            <FavoriteBorderOutlinedIcon
              style={{
                backgroundColor: item.item.likes.length > 0 ? "red" : "inherit",
              }}
            />{" "}
            like {item.item.likes.length}
          </button>
          <button className="btn post-comm-btn" onClick={commentClickHandler}>
            <ModeCommentOutlinedIcon />
          </button>
          <button
            className="btn post-save-btn"
            onClick={() => saveHandler(item.item._id)}
          >
            <BookmarkBorderOutlinedIcon />
          </button>
        </div>
        <div>
          {showComm && (
            <>
              <input
                type="text"
                value={commText}
                onChange={(e) => setCommText(e.target.value)}
              />
              <button onClick={() => commentHandler(item.item._id)}>
                comment
              </button>
              <div>
                <span>{commText}</span>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Post;
