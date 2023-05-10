import React, { useEffect, useState } from "react";
import UploadIcon from "../../../public/Icons/UploadIcon";
import { useLocation } from "react-router-dom";
import uploadImg from "../../../public/image/img-upload.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useUploaImage from "../../hooks/useUploadImage";
import { useAuthContext } from "../../context/authContext";
import moment from "moment/moment";
import { usePostsContext } from "../../context/postContext";

const Write = () => {
  const listCategory = [
    {
      name: "Công Nghệ",
      value: "công nghệ",
    },
    {
      name: "Khoa Học",
      value: "khoa học",
    },
    {
      name: "Điện Ảnh",
      value: "điện ảnh",
    },
    {
      name: "Thiết Kế",
      value: "thiết kế",
    },
    {
      name: "Đồ Ăn",
      value: "đồ ăn",
    },
    {
      name: "Đầu Bếp",
      value: "đầu bếp",
    },
  ];
  const state = useLocation().state;

  const [des, setDes] = useState(state?.des);
  const [title, setTitle] = useState(state?.title);
  const [category, setCategory] = useState(state?.cat || "công nghệ");
  const { handleChangeImage, loading, image, progress } = useUploaImage();
  const { token } = useAuthContext();
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const { handleAddPosts } = usePostsContext();
  const values = {
    title,
    des: getText(des),
    cat: category,
    img: image || state?.img,
    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  };
  useEffect(() => {
    if (!token) navigate("/");
  });
  return (
    <div className="mt-10 ">
      <h3 className="text-[32px]  font-bold text-mainColor ">Viết Bài</h3>
      <div className="flex gap-20 max-md:h-[900px] mt-20 max-md:flex-col max-md:gap-5 add">
        <div className="flex flex-col gap-20 max-md:flex-1 content">
          <input
            type="text"
            defaultValue=""
            value={title}
            name="title"
            placeholder="Tiêu đề"
            className="p-10 border border-gray-300"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editorContainer h-[300px] overflow-scroll border-solid border-mainColor border-gray-300">
            <ReactQuill
              className="editor"
              defaultValue=""
              theme="snow"
              value={des}
              onChange={setDes}
            />
          </div>
        </div>
        <div className="flex gap-20 menu flex-2">
          <label className="relative z-10 flex items-center justify-center item">
            <input
              type="file"
              name="image"
              className="hidden"
              onChange={handleChangeImage}
            />

            {image || state?.img ? (
              <img
                alt="img-upload"
                src={`${image || state?.img}`}
                width={100}
                className="absolute w-full h-full bg-cover cursor-pointer"
              />
            ) : (
              <img
                alt="img-upload"
                src={uploadImg}
                className={`cursor-pointer w-[100px]`}
              />
            )}
            {image && (
              <div className="item__delete absolute flex items-center justify-center cursor-pointer bg-mainColor z-100 w-[80px] h-[80px] rounded-full">
                <UploadIcon className="h-10 bg-mainColor w-14" />
              </div>
            )}
            {loading && (
              <div
                style={{
                  width: `${Math.ceil(progress)}%`,
                }}
                className={`progress absolute transition-all duration-150 ease-out  h-[5px] bottom-0 right-0 bg-mainColor`}
              ></div>
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
                      checked={category === item?.value}
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
            onClick={() => handleAddPosts(state, values, token)}
          >
            Cập nhật bài viết
          </button>
        ) : (
          <button
            className="px-8 py-3 rounded-md bg-mainColor text-whiteColor"
            onClick={() => handleAddPosts(state, values, token)}
          >
            Thêm Bài Viết
          </button>
        )}
      </div>
    </div>
  );
};

export default Write;
