import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import "./nav.css";

import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext/context";
const Navbar = () => {
  const navigate = useNavigate();
  const {
    userState: { user },
    userDispatch,
    token,
    setToken,
    isAuth,
    setIsAuth,
  } = useUser();
  const logoutHandler = () => {
    userDispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    setIsAuth(false);
    setToken(" ");
    navigate("/login");
  };
  return (
    <div className="nav-header">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="logo">jyogram</div>
      </Link>
      {user ? (
        <div className="nav-profile">
          <Link to="/profile">
            <img src={user.picturePath} className="nav-user-img" />
          </Link>
          <div
            style={{
              margin: "5px 10px",
              border: "1px solid white",
              padding: "5px 10px",
            }}
          >
            <Link
              to="/form"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              create
            </Link>
          </div>
          <button onClick={logoutHandler}>logout</button>
        </div>
      ) : (
        <div>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
