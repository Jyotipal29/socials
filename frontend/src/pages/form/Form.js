import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./form.css";
import { useState } from "react";
import FileBase from "react-file-base64";
import { usePost } from "../../context/postContext/context";
import { useUser } from "../../context/userContext/context";
import axios from "axios";
import { api } from "../../constants/api";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(" ");
  const [urlM, setUrl] = useState(" ");

  useEffect(() => {
    setPostData({ ...postData, picturePath: urlM });
  }, [urlM]);
  const {
    postState: { posts },
    postDispatch,
  } = usePost();
  console.log(posts, "posts");
  const {
    userState: { user },
    token,
  } = useUser();
  const [postData, setPostData] = useState({
    caption: "",
    tags: "",
    picturePath: "",
  });

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

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(postData, "postdata 27");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(`${api}post/`, postData, config);
      console.log(data, "post data 35");
      postDispatch({ type: "CREATE_POST", payload: data });
      setPostData({
        caption: " ",
        tags: "",
        picturePath: " ",
      });
      toast.success("post created");
      navigate("/");
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className=" mt-32 container mx-auto max-w-md">
      <div className="  flex justify-center items-center shadow-lg w-full">
        <form className=" py-5 space-y-6" onSubmit={submitHandler}>
          <h2 className="form-heading">Create Post</h2>

          <div className="form-control">
            <label>caption</label>
            <input
              className="border-2 outline-none w-full py-2"
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
              className="border-2 py-2 outline-none w-full"
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
              disabled={postData.picturePath.includes("/") ? false : true}
              style={{
                backgroundColor: postData.picturePath.includes("/")
                  ? "blue"
                  : "white",
              }}
            >
              Create
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Form;
