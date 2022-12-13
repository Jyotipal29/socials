import React, { useEffect, useState } from "react";
import "./profile.css";
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

  useEffect(() => {
    getMyPost();
  }, []);
  const getMyPost = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${api}post/mypost`, config);
    console.log(data, "data");
    setData(data);
  };

  return (
    <div className="profile-container">
      <div className="user-details">
        <img src={user.picturePath} className="profile-img" />
        <div>
          <h2 className="user-name">{user.name}</h2>
          <div className="follow-details">
            <span>0 post</span>
            <span>0 followers</span>
            <span>0 following</span>
          </div>
        </div>
        <button>edit</button>
      </div>

      <div className="profile-gallary">
        {data.map(
          (item) =>
            item.picturePath.includes("/") && (
              <img src={item.picturePath} className="item" />
            )
        )}
      </div>
    </div>
  );
};

export default Profile;