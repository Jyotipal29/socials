import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../constants/api";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext/context";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import "./auth.css";
const Register = () => {
  const [image, setImage] = useState(" ");
  const [formData, setFormData] = useState({
    name: " ",
    email: " ",
    password: " ",
    picturePath: " ",
  });
  const [loading, setLoading] = useState(false);
  // const [name, setName] = useState(" ");
  // const [email, setEmail] = useState(" ");
  // const [password, setPassword] = useState(" ");
  // const [pic, setPic] = useState(" ");
  // const [cnfPassword, setCnfPassword] = useState(" ");
  const [error, setError] = useState(" ");
  const navigate = useNavigate();
  const {
    userState: { user },
    userDispatch,
    token,
    setToken,
    isAuth,
    setIsAuth,
  } = useUser();
  // console.log(user);

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
  };
  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`${api}auth/register`, formData);
      console.log(data, "register data");
      const token = data.token;
      if (data) {
        userDispatch({ type: "REGISTER", payload: data });
        setLoading(false);
        console.log("user data", data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isAuth", true);
        localStorage.setItem("token", token);
        setIsAuth(true);
        setToken(token);
      }
      toast.success("registred successfuly");

      navigate("/");
    } catch (error) {
      setLoading(false);
      let errorMessage =
        error?.response?.data?.message || "Something went wrong";

      console.log(errorMessage, "error");
      toast.error(errorMessage);

      setError(errorMessage);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <form className="auth-form">
          <h2 className="auth-heading">Register</h2>
          {error && <span className="error-message">{error}</span>}
          <div className="auth-form-control">
            <small>Name</small>
            <input
              placeholder="name"
              className="border-2 outline-none w-full py-2"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="auth-form-control">
            <small>email</small>
            <input
              placeholder="email"
              className="border-2 outline-none w-full py-2"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="auth-form-control">
            <small>password</small>
            <input
              type="password"
              placeholder="password"
              className="border-2 outline-none w-full py-2"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="auth-form-control">
            <small>picture</small>
            <input className="pic-input" type="file" onChange={imgHandler} />
          </div>

          <button
            onClick={registerHandler}
            className="auth-btn"
            disabled={formData.picturePath.includes("/") ? false : true}
            style={{
              backgroundColor: formData.picturePath.includes("/")
                ? "blue"
                : "#eee",
            }}
          >
            {loading ? (
              <ClipLoader
                color="white"
                size={20}
                speedMultiplier={0.5}
                loading={loading}
              />
            ) : (
              "Register"
            )}
          </button>
          <button className="auth-btn-sec login px-2">
            <Link to="/login"> already have an account ? login</Link>
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;

// setImage(e.target.files[0])
