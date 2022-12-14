import React, { useEffect, useState } from "react";
import "./SavedPosts.css";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../constants/api";
import { usePost } from "../../context/postContext/context";

const SavedPosts = () => {
  const [data, setData] = useState([]);
  console.log(data, "actual data");
  const {
    postState: { SavedPosts },
    postDispatch,
  } = usePost();
  const {
    userState: { user },
    userDispatch,
    token,
  } = useUser();

  useEffect(() => {
    getAllSavedPost();
  }, []);

  const getAllSavedPost = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${api}save/savedPosts`, config);
    console.log(data, "saved data coming");
    setData(data);
  };

  return (
    <div className="saved-container">
      {data.map(({ _id, tags, caption, picturePath, postedBy, likes }) => (
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
            <button
              className="btn post-save-btn"
              onClick={() => saveHandler(_id)}
            >
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

export default SavedPosts;
