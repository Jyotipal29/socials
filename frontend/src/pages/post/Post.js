import React, { useState, useEffect } from "react";
import "./post.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { usePost } from "../../context/postContext/context";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/userContext/context";
import { api } from "../../constants/api";
import Model from "../../components/model/Model";
const Post = ({ item }) => {
  const [showMore, setShowMore] = useState(false);
  const [showComm, setShowComm] = useState(false);
  const [showAllComm, setShowAllComm] = useState(false);
  const [comm, setComm] = useState(item?.comments ?? []);
  const [likes, setLikes] = useState(item?.likes ?? []);
  const [inputVal, setInputVal] = useState("");
  const {
    postState: { savedPost },
    postDispatch,
  } = usePost();

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
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.patch(`${api}post/${id}/like`, {}, config);
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
    const { data } = await axios.post(
      `${api}save/toggleSavePost`,
      {userId: user._id, postId:id}
      config
    );
    getAllSavedPost();

    console.log(data, "the toogle save data");
    setSaveState({ isLoading: false, id });
  };
  useEffect(() => {
    getAllSavedPost();
  }, []);

  const getAllSavedPost = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${api}save/savedPost`, config);
      postDispatch({ type: "SAVE", payload: data });
    } catch (error) {
      console.log(error, "error");
    }
  };

  const showHandler = () => {
    setShowMore((prev) => !prev);
  };

  // comment
  const makeComment = async (text, id) => {
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

  console.log(comm, "this is comm");

  const deleteComm = async (commentId, postId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${api}post/comment`,
        { postId, commentId },
        config
      );
      console.log(data, "deleted data");
      setComm(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="feed-post-container">
      <div className="post-card w-full">
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
            <div className="w-96  py-2">
              <img
                src={item?.picturePath}
                alt=""
                className=" w-full h-full object-cover "
              />
            </div>
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
            ) : savedPost.some((it) => it._id === item._id) ? (
              <BookmarkBorderOutlinedIcon style={{ color: "blue" }} />
            ) : (
              <BookmarkBorderOutlinedIcon />
            )}
          </button>
        </div>
        <div className="w-full">
          {showComm && (
            <>
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(inputVal, item?._id);
                  setInputVal("");
                  setShowAllComm(true);
                }}
              >
                <div className="w-full">
                  <input
                    placeholder="add a comment"
                    className="border-b outline-none py-1 px-5"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                  />
                  <button className="text-blue-600">comment</button>
                </div>
              </form>
              <div
                className="flex space-x-6 py-2"
                onClick={() => setShowAllComm(!showAllComm)}
              >
                <p className="cursor-pointer">
                  {" "}
                  show all {comm.length} comments
                </p>{" "}
                <p></p>
              </div>
              {showAllComm &&
                comm.map((it) => (
                  <div key={it._id} className="ml-12 py-3 flex justify-between">
                    <div className="flex space-x-3">
                      <img
                        src={it?.postedBy?.picturePath}
                        className=" h-8 w-8 rounded-full"
                        alt=""
                      />
                      <p className="">{it?.postedBy?.name}:</p>
                      <p> {it.text}</p>
                    </div>
                    {user._id === it.postedBy._id ||
                    user._id === item.postedBy._id ? (
                      <button
                        className=""
                        onClick={() => deleteComm(it._id, item._id)}
                      >
                        <DeleteOutlineIcon className="text-red-600" />
                      </button>
                    ) : null}
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Post;
