import React, { useState, useEffect } from "react";
import "./post.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { usePost } from "../../context/postContext/context";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/userContext/context";
import { api } from "../../constants/api";
import Model from "../../components/model/Model";
const Post = ({ item }) => {
  // console.log(item, "item");
  const [showMore, setShowMore] = useState(false);
  const [showComm, setShowComm] = useState(false);
  const [comm, setComm] = useState(item?.comments ?? []);
  const [likes, setLikes] = useState(item?.likes ?? []);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {});

  const {
    postState: { savedPost },
    postDispatch,
  } = usePost();
  console.log(savedPost, "savedPost");
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
      // postDispatch({
      //   type: "LIKE_POST",
      //   payload: data,
      // });
      setLikes(data.likes);
      setLikeState({ isLoading: false, id: null });
    } catch (error) {
      console.log(error);
    }
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
    const { data } = await axios.get(`${api}save/savedPost`, config);

    isSaved
      ? postDispatch({ type: "SAVE", payload: data })
      : postDispatch({
          type: "REMOVE_SAVE",
          payload: data,
        });
    setIsSaved((prev) => !prev);
    setSaveState({ isLoading: false, id: null });
  };

  const showHandler = () => {
    setShowMore((prev) => !prev);
  };

  // comment
  const makeComment = async (text, id) => {
    console.log(text, id);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.patch(
      `${api}post/comment`,
      { text, postId: id },
      config
    );
    const dataG = data.comments;
    setComm(dataG);
  };
  console.log(comm, "comm");
  return (
    <div className="feed-post-container">
      <div className="post-card">
        <div className="post-profile-details">
          <Link
            to={
              item?.postedBy?._id !== user._id
                ? `/profile/${item?.postedBy?._id}`
                : "/profile"
            }
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="post-profile">
              <img src={item?.postedBy?.picturePath} alt="" />
              <p className="post-user-name">{item?.postedBy?.name}</p>
            </div>
          </Link>

          <div>
            {item?.postedBy?._id === user._id && (
              <>
                <button className="more-btn" onClick={showHandler}>
                  <MoreVertIcon />
                </button>
                {showMore && (
                  <Model
                    id={item?._id}
                    showMore={showMore}
                    setShowMore={setShowMore}
                  />
                )}
              </>
            )}
          </div>
        </div>

        <div className="post-details">
          <Link to={`/sp/${item?._id}`}>
            <img src={item?.picturePath} alt="" />
          </Link>
          <small className="post-caption">
            <strong style={{ color: "#0f172a" }}>
              {item?.postedBy?.name}{" "}
            </strong>
            {item?.caption}
          </small>
          <small className="post-tags">
            {item?.tags?.map((tag) => `#${tag} `)}
          </small>
          <small style={{ color: "#777" }}>comments</small>
          {comm.map((it) => (
            <div key={it._id} className="post-comm">
              <strong>{item?.postedBy?.name}:</strong>
              {it.text}
            </div>
          ))}
        </div>
        <div className="post-btn">
          <button
            className="btn post-like-btn"
            onClick={() => likeHandler(item?._id)}
          >
            {likeState?.id === item?._id && likeState?.isLoading ? (
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
                    color: likes.length > 0 ? "blue" : "inherit",
                  }}
                />
                <small
                  style={{
                    color: likes.length > 0 ? "blue" : "inherit",
                  }}
                >
                  like {likes.length}
                </small>
              </>
            )}
          </button>
          <button
            className="btn post-like-btn"
            onClick={() => setShowComm(!showComm)}
          >
            <ModeCommentOutlinedIcon />
          </button>

          <button
            className="btn post-save-btn"
            onClick={() => saveHandler(item?._id)}
          >
            {saveState?.id === item?._id && saveState?.isLoading ? (
              <ClipLoader
                color="blue"
                size={20}
                speedMultiplier={0.5}
                loading={saveState?.isLoading}
              />
            ) : (
              <>
                <BookmarkBorderOutlinedIcon />
              </>
            )}
          </button>
        </div>
        <div>
          {showComm && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                makeComment(e.target[0].value, item?._id);
              }}
            >
              <input />
              <button>comment</button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Post;
