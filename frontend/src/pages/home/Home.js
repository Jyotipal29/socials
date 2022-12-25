import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext/context";
import "./home.css";
import { api } from "../../constants/api";
import axios from "axios";
import Post from "../post/Post";
import Sidenav from "../sidenav/Sidenav";
import { usePost } from "../../context/postContext/context";
import FadeLoader from "react-spinners/FadeLoader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [_posts, setPosts] = useState([]);

  const {
    userState: { user },
    userDispatch,
    token,
  } = useUser();

  const {
    postState: { posts },
    postDispatch,
  } = usePost();
  useEffect(() => {
    getAllFeedPosts();
  }, []);

  const getAllFeedPosts = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${api}post/followingpost`, config);
      // console.log(data, "feed data");
      // postDispatch({
      //   type: "GET_POSTS",
      //   payload: data,
      // });
      console.log(data);
      setPosts(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const getUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config);
    const { data } = await axios.get(`${api}user/${user._id}`, config);
    // console.log(data, "user data");
    userDispatch({
      type: "GET_USER",
      payload: data,
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="home-container">
      {loading ? (
        <div className="loader">
          <FadeLoader
            color="blue"
            height={100}
            speedMultiplier={2}
            width={1}
            margin={50}
            loading={loading}
          />
        </div>
      ) : (
        _posts.map((item) => <Post item={item} />)
      )}
    </div>
  );
};

export default Home;
