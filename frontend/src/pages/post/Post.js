import React from "react";
import "./post.css";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { usePost } from "../../context/postContext/context";
import { Button } from "@mui/material";
import axios from "axios";
import { useUser } from "../../context/userContext/context";
import { api } from "../../constants/api";
const Post = () => {
  const {
    postState: { posts },
    postDispatch,
  } = usePost();
  const {
    userState: { user },
    token,
  } = useUser();
  console.log(posts, "posts");
  const likeHanlder = async (id) => {
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
      <div className="post-card">
        <div className="post-profile-details">
          <img src="https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80" />
          <p className="post-user-name">Jyoti</p>
        </div>
        <div className="post-details">
          <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
          <small className="post-caption">
            <strong> Jyoit:</strong>
            No caption needed
          </small>
          <small className="post-tags">#happy #newlife #wedding</small>
        </div>
        <div className="post-btn">
          <button className="btn post-like-btn">
            <FavoriteBorderOutlinedIcon />
          </button>
          <button className="btn post-comm-btn">
            <ModeCommentOutlinedIcon />
          </button>
          <button className="btn post-save-btn">
            <BookmarkBorderOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
