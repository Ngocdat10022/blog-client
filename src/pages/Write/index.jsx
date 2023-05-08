import React, { useEffect, useState } from "react";
import UploadIcon from "../../../public/Icons/UploadIcon";
import { useLocation, useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useUploaImage from "../../hooks/useUploadImage";
import { useAuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { addPosts, updatePosts } from "../../service/posts";
import moment from "moment/moment";

const Write = () => {
  const state = useLocation().state;

  const [des, setDes] = useState(state?.des);
  const [title, setTitle] = useState(state?.title);
  const [category, setCategory] = useState(state?.cat);
  const listCategory = [
    {
      name: "Art",
      value: "art",
    },
    {
      name: "Technology",
      value: "technology",
    },
    {
      name: "Science",
      value: "science",
    },
    {
      name: "Cinema",
      value: "cinema",
    },
    {
      name: "Design",
      value: "design",
    },
    {
      name: "Food",
      value: "food",
    },
  ];
  const navigate = useNavigate();
  const { handleChangeImage, loading, image } = useUploaImage();
  const { token } = useAuthContext();
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const values = {
    title,
    des: getText(des),
    cat: category,
    img: image,
    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  };

  const handleAddPosts = async () => {
    if (state) {
      const idPosts = state?.id;
      const data = await updatePosts(values, token, idPosts);
      if (data) toast.success("Update posts successfully");
      navigate("/");
    } else {
      const data = await addPosts(values, token);
      if (data) toast.success("addPosts successfully");
      navigate("/");
    }
  };

  useEffect(() => {
    if (!token) navigate("/");
  });

  return (
    <div className="mt-10 ">
      <h3 className="text-[32px] font-bold text-mainColor ">Add New Posts</h3>
      <div className="flex gap-20 mt-20 add">
        <div className="flex flex-col gap-20 content flex-5">
          <input
            type="text"
            value={title}
            name="title"
            placeholder="Title"
            className="p-10 border border-gray-300"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editorContainer h-[300px] overflow-scroll border border-gray-300">
            <ReactQuill
              className="editor"
              theme="snow"
              value={des}
              onChange={setDes}
            />
          </div>
        </div>
        <div className="flex flex-col gap-20 menu flex-2">
          <label className="relative z-10 flex items-center justify-center item">
            <input
              type="file"
              name="image"
              className="hidden"
              onChange={handleChangeImage}
            />

            {image ? (
              <img
                alt="img-upload"
                src={`${image}`}
                width={100}
                className="absolute w-full h-full bg-cover cursor-pointer"
              />
            ) : (
              <img
                alt="img-upload"
                src="./public/image/img-upload.png"
                width={100}
                className="cursor-pointer "
              />
            )}
            {image && (
              <div className="item__delete absolute flex items-center justify-center cursor-pointer bg-mainColor z-100 w-[80px] h-[80px] rounded-full">
                <UploadIcon className="h-10 bg-mainColor w-14" />
              </div>
            )}
          </label>
          <div className="flex flex-col justify-between flex-1 p-10 text-sm text-gray-500 border border-gray-300 item">
            <h1 className="text-xl">Category</h1>
            {listCategory.length > 0 &&
              listCategory.map((item) => {
                return (
                  <div
                    className="flex items-center gap-2 text-teal-500 cat"
                    key={item?.value}
                  >
                    <input
                      type="radio"
                      name={item?.value}
                      // checked={state?.cat || category}
                      value={item?.value}
                      id={item?.value}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <label htmlFor={item?.value}>{item?.name}</label>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-7">
        {state ? (
          <button
            className="px-8 py-3 rounded-md bg-mainColor text-whiteColor"
            onClick={handleAddPosts}
          >
            Update post
          </button>
        ) : (
          <button
            className="px-8 py-3 rounded-md bg-mainColor text-whiteColor"
            onClick={handleAddPosts}
          >
            Add post
          </button>
        )}
      </div>
    </div>
  );
};

export default Write;
