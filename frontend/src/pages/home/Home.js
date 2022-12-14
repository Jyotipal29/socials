import React, { useEffect } from "react";
import { useUser } from "../../context/userContext/context";
import "./home.css";
import { api } from "../../constants/api";
import axios from "axios";
import Post from "../post/Post";
import Sidenav from "../sidenav/Sidenav";
const Home = () => {
  const {
    userState: { user },
    userDispatch,
    token,
  } = useUser();

  const getUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    console.log(config);
    const { data } = await axios.get(`${api}user/${user._id}`, config);
    console.log(data, "user data");
    userDispatch({
      type: "GET_USER",
      payload: data,
    });
  };
  useEffect(() => {
    getUser();
  }, [user]);
  return (
    <div className="home-container">
      <div className="home-user-container">{/* <Sidenav /> */}</div>
      <div className="home-post-container">
        <Post />
      </div>
      <div className="home-friends-container"></div>
    </div>
  );
};

export default Home;
