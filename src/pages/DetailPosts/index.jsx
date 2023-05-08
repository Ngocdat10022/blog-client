import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  // console.log("posts", detailPosts);
  // console.log("currentUser", currentUser);

  const handleDeletePosts = async () => {
    const data = await deletePosts(token, detailPosts?.id);
    if (data) toast.success(`${data}`);
    navigate("/");
  };
  return (
    <div className="flex items-start gap-5">
      <div className="flex flex-col gap-5 items-start w-[70%]">
        <div className="w-full">
          <img src={detailPosts?.img} className="w-full" />
        </div>
        <div className="flex items-center gap-3">
          <img
            className="w-[50px] h-[50px] rounded-full"
            src={detailPosts?.img}
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
        <div className="text-[44px] font-bold">
          <h3>{detailPosts?.title}</h3>
        </div>
        <div className="text-xl text-textColor">
          <p className=" first-letter:text-7xl first-letter:font-bold">
            {detailPosts?.des}
          </p>
        </div>
      </div>
      <div className="flex-1 ">
        <h3 className="text-2xl font-bold text-center">Bài viết liên quan</h3>
        <div className="grid grid-cols-1">
          {postsSimilar.length > 0 &&
            postsSimilar.map((post) => {
              return <Card title={post?.title} src={post?.img} id={post?.id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
