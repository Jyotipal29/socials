import React, { useEffect, useState } from "react";
import "./profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../context/userContext/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../constants/api";
const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const {
    userState: { user },
    userDispatch,
    token,
    setToken,
    isAuth,
    setIsAuth,
  } = useUser();

  // useEffect(() => {
  //   const data = localStorage.getItem("user");
  //   console.log("--------");

  //   console.log(data);
  //   console.log("--------");
  //   console.log(user);
  //   console.log("====");
  //   userDispatch({
  //     type: "UPDATE",
  //     payload: data,
  //   });
  // }, []);

  useEffect(() => {
    getMyPost();
  }, [user]);
  const getMyPost = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${api}post/mypost`, config);
    setData(data);
  };
  const logoutHandler = () => {
    userDispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    setIsAuth(false);
    setToken(" ");
    navigate("/login");
    toast.success("logged out");
  };

  return (
    <div className="profile-container">
      <div className="user-details">
        <img src={user.picturePath} className="profile-img" />
        <div className="profile-user-follow">
          <h2 className="user-name">{user.name}</h2>
          <div className="follow-details">
            <span>{data?.length} post</span>
            <span>{user?.followers?.length}followers</span>
            <span>{user?.following?.length} following</span>
          </div>
        </div>
        <button className="profile-logout-btn" onClick={logoutHandler}>
          logout
        </button>
        <button className="profile-edit-btn">edit</button>
      </div>

      <div className="profile-gallary">
        {data.map(
          (item) =>
            item.picturePath.includes("/") && (
              <img src={item.picturePath} className="item" />
            )
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
