import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./sidenav.css";
const Sidenav = () => {
  return (
    <div className="sidenav-container">
      <div className="sidenav-wrapper">
        <ul>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <li>
              <HomeOutlinedIcon /> Home
            </li>
          </Link>
          <Link
            to="/explore"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li>
              <ExploreOutlinedIcon /> Explore
            </li>
          </Link>
          <Link
            to="/saved"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li>
              <BookmarkBorderOutlinedIcon /> Save
            </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <li>
              <AccountCircleOutlinedIcon /> Profile
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
