import React, { useEffect } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { usePost } from "../../context/postContext/context";
import { useUser } from "../../context/userContext/context";
import { api } from "../../constants/api";
import { Link } from "react-router-dom";
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
          {/* <div className="post-btn">
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
            <button className="btn post-save-btn">
              <BookmarkBorderOutlinedIcon />
            </button>
          </div> */}
          {/* <div>
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
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Explore;
