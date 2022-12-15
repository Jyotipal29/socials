import React, { useEffect, useState } from "react";
import "./SavedPosts.css";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../constants/api";
import { usePost } from "../../context/postContext/context";
import Post from "../post/Post";

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
      {data.map((item) => (
        <Post item={item} />
      ))}
    </div>
  );
};

export default SavedPosts;
