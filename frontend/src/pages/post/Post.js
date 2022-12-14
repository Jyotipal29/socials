import React, { useEffect, useState } from "react";
import "./post.css";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { usePost } from "../../context/postContext/context";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/userContext/context";
import { api } from "../../constants/api";
const Post = () => {
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
  console.log(posts, "posts");

  useEffect(() => {
    getAllFeedPosts();
  }, []);

  const getAllFeedPosts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${api}post/followingpost`, config);
    console.log(data, "feed data");
    postDispatch({
      type: "GET_POSTS",
      payload: data,
    });
  };

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
  const commentClickHandler = () => {
    setShowComm((prev) => !prev);
  };

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
      console.log(data, "comment data");
      setCommText(" ");
    } catch (error) {
      console.log(error);
    }
  };
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
    console.log(data, "saved data");
  };
  return (
    <div className="feed-post-container">
      {/* <div>
        {posts.map((item) => (
          <div style={{ border: "1px solid black" }}>
            <img src={item.picturePath} />
            <p>{item.caption}</p>
            <h4>{item.tags.map((tag) => `#${tag} `)}</h4>
            <div>
              <button onClick={() => likeHanlder(item._id)}>
                like {item.likes.length}
              </button>
              <button onClick={() => deleteHandler(item._id)}>delete</button>
            </div>
          </div>
        ))}
      </div> */}
      {posts.map(({ _id, tags, caption, picturePath, postedBy, likes }) => (
        <div className="post-card">
          <Link
            to={
              postedBy._id !== user._id
                ? `/profile/${postedBy._id}`
                : "/profile"
            }
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="post-profile-details">
              <img src={postedBy.picturePath} />
              <p className="post-user-name">{postedBy.name}</p>
            </div>
          </Link>

          <div className="post-details">
            <img src={picturePath} />
            <small className="post-caption">
              <strong>{user.name}:</strong>
              {caption}
            </small>
            <small className="post-tags">{tags.map((tag) => `#${tag} `)}</small>
          </div>
          <div className="post-btn">
            <button
              className="btn post-like-btn"
              onClick={() => likeHandler(_id)}
            >
              <FavoriteBorderOutlinedIcon
                style={{
                  backgroundColor: likes.length > 0 ? "red" : "inherit",
                }}
              />{" "}
              like {likes.length}
            </button>
            <button className="btn post-comm-btn" onClick={commentClickHandler}>
              <ModeCommentOutlinedIcon />
            </button>
            <button
              className="btn post-save-btn"
              onClick={() => saveHandler(_id)}
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
                <button onClick={() => commentHandler(_id)}>comment</button>
                <div>
                  <span>{commText}</span>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
