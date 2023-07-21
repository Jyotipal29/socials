import React, { useEffect, useState } from "react";
import "./other.css";
import { useUser } from "../../context/userContext/context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../constants/api";
import { Link } from "react-router-dom";
const OtherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const [showFollow, setShowFollow] = useState(true);
  // console.log(profileData, "other user data");
  const {
    userState: { user },
    userDispatch,
    token,
  } = useUser();

  console.log(user, "user");
  useEffect(() => {
    getOtherUser();
  }, []);
  const getOtherUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${api}user/user/${id}`, config);
    // console.log(data.userPosts, "data");
    setProfileData(data);
  };

  // follow
  // updating the value of 'showFollow'
  useEffect(() => {
    user?.following?.forEach((followingUser) => {
      if (followingUser === id) {
        setShowFollow(false);
      }
    });
  }, []);

  // const followUser = async () => {

  // };
  const followhandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${api}user/follow`,
      { followId: profileData.user._id },
      config
    );

    userDispatch({
      type: "UPDATE",
      payload: {
        followers: data.followers,
        following: data.following,
      },
    });
    // console.log(data, "follow data");
    localStorage.setItem("user", JSON.stringify(data));
    setProfileData((prev) => {
      return {
        ...prev,
        user: {
          ...prev.user,
          followers: [...prev.user.followers, data._id],
        },
      };
    });
    setShowFollow(false);
  };

  // unfollow

  const unfollowhandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${api}user/unfollow`,
      { unfollowId: profileData.user._id },
      config
    );

    userDispatch({
      type: "UPDATE",
      payload: {
        followers: data.followers,
        following: data.following,
      },
    });
    // console.log(data, "follow data");
    localStorage.setItem("user", JSON.stringify(data));
    setProfileData((prev) => {
      const newFollower = prev.user.followers.filter((it) => it != data._id);
      return {
        ...prev,
        user: {
          ...prev.user,
          followers: newFollower,
        },
      };
    });
    setShowFollow(true);
  };

  console.log(profileData, "this is profile data");

  return (
    <div className="profile-container">
      <div className="user-details">
        <img src={profileData?.user?.picturePath} className="profile-img" />
        <div>
          <h2 className="user-name">{profileData?.user?.name}</h2>

          <div className="follow-details">
            <span>{profileData?.userPosts?.length} post</span>
            <span>{profileData?.user?.followers?.length} followers</span>
            <span>{profileData?.user?.following?.length}following</span>
          </div>
        </div>
        {showFollow ? (
          <button className="profile-logout-btn" onClick={followhandler}>
            follow
          </button>
        ) : (
          <button className="profile-logout-btn" onClick={unfollowhandler}>
            unfollow
          </button>
        )}
      </div>

      <div className="profile-gallary">
        {profileData?.userPosts?.map(
          (item) =>
            item.picturePath.includes("/") && (
              <Link to={`/sp/${item._id}`}>
                <img src={item.picturePath} className="item" alt="" />
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default OtherProfile;
