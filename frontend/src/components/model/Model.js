import React from "react";
import "./model.css";
import axios from "axios";
import { api } from "../../constants/api";
import { useUser } from "../../context/userContext/context";
import { useNavigate, Link } from "react-router-dom";
const Model = ({ id, showMore, setShowMore }) => {
  console.log(showMore, id, "showmore");
  const navigate = useNavigate();
  const {
    userState: { user },
    token,
  } = useUser();

  const deleteHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`${api}post/${id}`, config);
    navigate("/profile");
  };
  const closeHandler = () => {
    setShowMore((prev) => !prev);
  };
  return (
    <div className="model-container">
      <button className="more-delete-btn" onClick={deleteHandler}>
        delete
      </button>
      <button className="more-edit-btn">
        <Link
          to={`/edit/${id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          edit
        </Link>
      </button>
      <button className="close-model" onClick={closeHandler}>
        x
      </button>
    </div>
  );
};

export default Model;
