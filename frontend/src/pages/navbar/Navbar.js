import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import "./nav.css";

import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext/context";
const Navbar = () => {
  const navigate = useNavigate();
  const {
    userState: { user },
  } = useUser();

  return (
    <div className="nav-header">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="logo">Jyogram</div>
      </Link>
      {user ? (
        <ul className="nav-profile">
          <Link to="/profile">
            <li className="nav-profile-item">
              <img
                src={user.picturePath}
                className="w-10 h-10 rounded-full  object-top"
                alt=""
              />
            </li>
          </Link>

          <Link to="/form" style={{ textDecoration: "none", color: "inherit" }}>
            <li className="nav-profile-item">
              <AddOutlinedIcon fontSize="large" color="white" />
            </li>
          </Link>

          <Link
            to="/explore"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="nav-profile-item">
              <ExploreOutlinedIcon fontSize="large" />
            </li>
          </Link>
          <Link
            to="/saved"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="nav-profile-item">
              <BookmarkBorderOutlinedIcon fontSize="large" />
            </li>
          </Link>
        </ul>
      ) : (
        <div className="nav-login-btn">
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
