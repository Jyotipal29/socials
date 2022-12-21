import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../constants/api";
import { useUser } from "../../context/userContext/context";
import "./single.css";
import FadeLoader from "react-spinners/FadeLoader";
import Post from "../post/Post";
import { usePost } from "../../context/postContext/context";
const Singlepost = () => {
  const [loading, setLoading] = useState(false);

  const { token } = useUser();
  const {
    postState: { post },
    postDispatch,
  } = usePost();
  console.log(post, "post");
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getSinglePost();
  }, [id]);
  const getSinglePost = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${api}post/${id}`, config);
    console.log(data, " single data");

    postDispatch({ type: "ONE_POST", payload: data });
    setLoading(false);
  };
  console.log(post, "the single data in data");
  return (
    <div className="single-container">
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
        post && post?.map((item) => <Post item={item} />)
      )}
    </div>
  );
};

export default Singlepost;
