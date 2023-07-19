import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../constants/api";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext/context";
import ClipLoader from "react-spinners/ClipLoader";

import "./auth.css";
const SignIn = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${api}auth/login`, {
        email,
        password,
      });
      console.log(data);

      const token = data.token;
      if (data) {
        userDispatch({ type: "LOGIN", payload: data });
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isAuth", true);
        localStorage.setItem("token", token);
        setIsAuth(true);
        setToken(token);
        toast.success("logged in successfuly");
      }

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 5000);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <form className="space-y-5" onSubmit={handleLogin}>
          <h2 className="auth-heading">Log In</h2>
          {error && <span className="error-message">{error}</span>}
          <div className="auth-form-control">
            <small>email</small>
            <input
              placeholder="email"
              value={email}
              className="border-2 outline-none w-full py-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-form-control">
            <small>password</small>
            <input
              type="password"
              value={password}
              className="border-2 outline-none w-full py-2"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2 ">
            <button type="submit" className="bg-blue-600 py-2  text-white">
              {loading ? (
                <ClipLoader
                  color="white"
                  size={20}
                  speedMultiplier={0.5}
                  loading={loading}
                />
              ) : (
                "Log In"
              )}
            </button>
            <button
              type="button"
              className="border-2 border-blue-600 py-1  text-blue-600"
              onClick={(e) => {
                e.preventDefault();
                setEmail("guest@gmail.com");
                setPassword("guest");
              }}
            >
              guest login
            </button>
            <button className="auth-btn-sec px-2">
              <Link to="/register"> dont have an account ? register</Link>
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
