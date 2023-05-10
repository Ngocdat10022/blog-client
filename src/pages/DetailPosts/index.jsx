import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import avatar from "../../../public/image/profile-avatar.png";

import {
  deletePosts,
  getDetailPosts,
  getPostsSimilar,
} from "../../service/posts";
import Card from "../../components/Card";
import { useAuthContext } from "../../context/authContext";
import penImg from "../../../public/image/pen.png";
import deleteImg from "../../../public/image/delete.jpg";
import { toast } from "react-toastify";
import List from "../../components/List";
import Swal from "sweetalert2";
const DetailPost = () => {
  const { id } = useParams();
  const [detailPosts, setDetailPosts] = useState([]);
  const [postsSimilar, setPostsSimilar] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDetailPosts(id).then((data) => {
      setDetailPosts(data[0]);
    });
  }, [id]);

  useEffect(() => {
    getPostsSimilar(id).then((data) => {
      setPostsSimilar(data);
    });
  }, [id]);

  const { currentUser, token } = useAuthContext();
  console.log("posts", detailPosts);
  // console.log("currentUser", currentUser);

  const handleDeletePosts = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await deletePosts(token, detailPosts?.id);
        if (data) Swal.fire(`${data}`);
        navigate("/");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };
  return (
    <div className="flex items-start gap-5 max-lg:flex-col">
      <div className="flex flex-col max-lg:w-full gap-5 items-start w-[70%]">
        <div className="w-full">
          <img src={detailPosts?.img} className="w-full" />
        </div>
        <div className="flex items-center gap-3">
          <img
            className="w-[50px] h-[50px] rounded-full"
            src={detailPosts?.avatar || avatar}
          />
          <div className="flex flex-col items-start">
            <span className="text-sm font-bold">{detailPosts?.username}</span>
            {currentUser?.username === detailPosts?.username && (
              <div className="flex items-center justify-center gap-2">
                <Link to={`/write?edit=${detailPosts?.id}`} state={detailPosts}>
                  <span>
                    <img
                      src={penImg}
                      alt="img"
                      className="w-5 cursor-pointer"
                    />
                  </span>
                </Link>
                <span>
                  <img
                    src={deleteImg}
                    alt="img"
                    className="w-5 cursor-pointer"
                    onClick={handleDeletePosts}
                  />
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="text-[44px] max-md:text-4xl font-bold">
          <h3>{detailPosts?.title}</h3>
        </div>
        <div className="text-xl text-textColor">
          <p className=" first-letter:text-7xl first-letter:font-bold">
            {detailPosts?.des}
          </p>
        </div>
      </div>
      <div className="flex-1 max-lg:w-full ">
        <h3 className="text-2xl font-bold text-center">Bài viết liên quan</h3>
        <div className="grid grid-cols-1 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {postsSimilar.length > 0 &&
            postsSimilar.map((post) => {
              return (
                <Card
                  title={post?.title}
                  src={post?.img}
                  id={post?.id}
                  key={post?.id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
