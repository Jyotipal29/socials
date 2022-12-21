import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../constants/api";
import { useUser } from "../../context/userContext/context";
import "./single.css";
const Singlepost = () => {
  const {
    userState: { user },
    token,
  } = useUser();
  const params = useParams();
  const id = params.id;
  console.log(id, "id");
  const [data, setData] = useState([]);

  useEffect(() => {
    getSinglePost();
  }, [id]);
  const getSinglePost = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${api}post/${id}`, config);
    console.log(data, "data");
  };

  return <div className="single-container"></div>;
};

export default Singlepost;
