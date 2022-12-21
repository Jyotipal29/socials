import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/userContext/context";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../constants/api";
import { usePost } from "../../context/postContext/context";
const EditForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  console.log(id, "user id");
  const [urlM, setUrl] = useState(" ");
  const [postData, setPostData] = useState({
    caption: "",
    tags: "",
    picturePath: "",
  });
  const {
    userState: { user },
    token,
  } = useUser();
  const {
    postState: { post },
    postDispatch,
  } = usePost();
  useEffect(() => {
    setPostData({ ...postData, picturePath: urlM });
  }, [urlM]);
  const changeHandler = (e) => {
    const dataM = new FormData();
    dataM.append("file", e.target.files[0]);
    dataM.append("upload_preset", "jyotipal");
    dataM.append("cloud_name", "dipetklsh");
    fetch("https://api.cloudinary.com/v1_1/dipetklsh/image/upload", {
      method: "post",
      body: dataM,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(urlM, "url");
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${api}post/${id}`, config);
    setPostData({
      caption: data.caption,
      tags: data.tags,
    });
    console.log(data, "post data");
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`${api}post/${id}`, postData, config);
    console.log(data, "updated post data");
    postDispatch({ type: "UPDATE_POST", payload: data });
    navigate(`/sp/${id}`);
  };
  return (
    <div className="create-form-container">
      <div className="create-form-wrapper">
        <form className="create-form" onSubmit={submitHandler}>
          <h2 className="form-heading"> Edit Post</h2>

          <div className="form-control">
            <label>caption</label>
            <input
              className="form-input"
              name="caption"
              value={postData.caption}
              onChange={(e) =>
                setPostData({ ...postData, caption: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label>tags</label>
            <input
              className="form-input"
              name="tags"
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
            />
          </div>
          <div className="form-control">
            <label>picture</label>

            <input
              className="pic-input"
              placeholder="upload pic"
              type="file"
              onChange={changeHandler}
            />

            <button
              type="submit"
              className="form-btn btn-submit"
              disabled={postData?.picturePath?.includes("/") ? false : true}
              style={{
                backgroundColor: postData?.picturePath?.includes("/")
                  ? "blue"
                  : "#eee",
              }}
            >
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
