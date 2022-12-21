import React, { useEffect, useState } from "react";
import "./post.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

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
  console.log(item, "all the value");
  const {
    postState: { savedPost },
    postDispatch,
  } = usePost();

  const [isSaved, setIsSaved] = useState(
    savedPost?.some((it) => it._id === item?.item?._id)
  );

  const [likeState, setLikeState] = useState({
    id: null,
    isLoading: false,
  });
  const [saveState, setSaveState] = useState({
    id: null,
    isLoading: false,
  });
  const [showComm, setShowComm] = useState(false);
  const [commText, setCommText] = useState(" ");

  const {
    userState: { user },
    token,
  } = useUser();

  //like
  const likeHandler = async (id) => {
    setLikeState({ isLoading: true, id });
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
      setLikeState({ isLoading: false, id: null });
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
    setSaveState({ isLoading: true, id });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { dataM } = await axios.post(
      `${api}save/toggleSavePost`,
      { postid: id },
      config
    );
    const { data } = await axios.get(`${api}save/savedPosts`, config);

    isSaved
      ? postDispatch({ type: "SAVE", payload: data })
      : postDispatch({
          type: "REMOVE_SAVE",
          payload: data,
        });
    setIsSaved((prev) => !prev);
    setSaveState({ isLoading: false, id: null });
  };
  return (
    <div className="feed-post-container">
      <div className="post-card">
        <Link
          to={
            item?.item?.postedBy?._id !== user._id
              ? `/profile/${item?.item?.postedBy?._id}`
              : "/profile"
          }
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div className="post-profile-details">
            <img src={item?.item?.postedBy?.picturePath} />
            <p className="post-user-name">{item?.item?.postedBy?.name}</p>
          </div>
        </Link>

        <div className="post-details">
          <Link to={`/sp/${item?.item?._id}`}>
            <img src={item?.item?.picturePath} />
          </Link>
          <small className="post-caption">
            <strong style={{ color: "#0f172a" }}>
              {item?.item?.postedBy?.name}{" "}
            </strong>
            {item?.item?.caption}
          </small>
          <small className="post-tags">
            {item?.item?.tags?.map((tag) => `#${tag} `)}
          </small>
        </div>
        <div className="post-btn">
          <button
            className="btn post-like-btn"
            onClick={() => likeHandler(item?.item?._id)}
          >
            {likeState?.id === item?.item?._id && likeState?.isLoading ? (
              <ClipLoader
                color="blue"
                size={20}
                speedMultiplier={0.5}
                loading={likeState?.isLoading}
              />
            ) : (
              <>
                <FavoriteBorderOutlinedIcon
                  style={{
                    color: item?.item?.likes?.length > 0 ? "blue" : "inherit",
                  }}
                />
                <small
                  style={{
                    color: item?.item?.likes?.length > 0 ? "blue" : "inherit",
                  }}
                >
                  like {item?.item?.likes?.length}
                </small>
              </>
            )}
          </button>
          <button className="btn post-comm-btn" onClick={commentClickHandler}>
            <ModeCommentOutlinedIcon />
          </button>
          <button
            className="btn post-save-btn"
            onClick={() => saveHandler(item?.item?._id)}
          >
            {saveState?.id === item?.item?._id && saveState?.isLoading ? (
              <ClipLoader
                color="blue"
                size={20}
                speedMultiplier={0.5}
                loading={saveState?.isLoading}
              />
            ) : (
              <>
                <BookmarkBorderOutlinedIcon
                  style={{
                    color: savedPost?.some((it) => it._id === item?.item?._id)
                      ? "blue"
                      : "inherit",
                  }}
                />
              </>
            )}
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
