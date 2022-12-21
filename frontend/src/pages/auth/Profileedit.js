import React, { useEffect } from "react";
import { useState } from "react";
import "./auth.css";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/userContext/context";
import axios from "axios";
import { api } from "../../constants/api";
const Profileedit = () => {
  const params = useParams();
  const id = params.id;
  console.log(id, "id");
  const [formData, setFormData] = useState({
    name: " ",
    picturePath: " ",
  });
  const [error, setError] = useState(" ");
  const navigate = useNavigate();
  const { userState, userDispatch, token } = useUser();
  const imgHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "jyotipal");
    data.append("cloud_name", "dipetklsh");
    fetch("https://api.cloudinary.com/v1_1/dipetklsh/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({ ...formData, picturePath: data.url });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(formData.picturePath);
  };

  const getUserData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${api}user/${id}`, config);
    console.log(data, "user data");

    setFormData({
      name: data.name,
    });
  };
  useEffect(() => {
    getUserData();
  }, [id]);

  const updateHandler = async (e) => {
    e.preventDefault();
    console.log(formData, "formdata");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.patch(
      `${api}user/update/${id}`,
      formData,
      config
    );
    
    userDispatch({ type: "UPDATE_USER", payload: data });
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/profile");
    console.log(data, "updated data");
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <form className="auth-form">
          <h2 className="auth-heading">Edit Profile</h2>
          {error && <span className="error-message">{error}</span>}
          <div className="auth-form-control">
            <small>Name</small>
            <input
              placeholder="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="auth-form-control">
            <small>picture</small>
            <input className="pic-input" type="file" onChange={imgHandler} />
          </div>

          <button
            onClick={updateHandler}
            className="auth-btn"
            disabled={formData?.picturePath?.includes("/") ? false : true}
            style={{
              backgroundColor: formData?.picturePath?.includes("/")
                ? "blue"
                : "#eee",
            }}
          >
            update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profileedit;
