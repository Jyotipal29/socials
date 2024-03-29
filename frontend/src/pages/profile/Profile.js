import React, { useEffect, useState } from "react";
import "./profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../context/userContext/context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../constants/api";
import FadeLoader from "react-spinners/FadeLoader";

const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    userState: { user },
    userDispatch,
    token,
    setToken,
    isAuth,
    setIsAuth,
  } = useUser();

  console.log(user, "user in profile");

  useEffect(() => {
    getMyPost();
  }, [user]);
  const getMyPost = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${api}post/mypost`, config);
    setData(data);
    setLoading(false);
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

        <button className="profile-edit-btn">
          <Link
            to={`/profile/edit/${user?._id}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            edit
          </Link>
        </button>
      </div>
      {loading ? (
        <div className="loader-profile">
          <FadeLoader
            color="blue"
            height={10}
            speedMultiplier={2}
            width={1}
            margin={5}
            loading={loading}
          />
        </div>
      ) : (
        <>
          <div className="profile-gallary">
            {data.map(
              (item) =>
                item.picturePath.includes("/") && (
                  <Link to={`/sp/${item._id}`}>
                    <img src={item.picturePath} className="item" />
                  </Link>
                )
            )}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Profile;
