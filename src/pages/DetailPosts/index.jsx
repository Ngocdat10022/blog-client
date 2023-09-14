import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import avatar from "../../../public/image/profile-avatar.png";
import Card from "../../components/Card";
import { useAuthContext } from "../../context/authContext";
import penImg from "../../../public/image/pen.png";
import deleteImg from "../../../public/image/delete.jpg";
import { usePostsContext } from "../../context/postContext";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import moment from "moment/moment";

const DetailPost = () => {
  const { id } = useParams();
  const { currentUser, token } = useAuthContext();
  const {
    detailPosts,
    postsSimilar,
    handleDeletePosts,
    handleGetDetailPosts,
    handleGetPostsSimilar,
    loading,
  } = usePostsContext();

  useEffect(() => {
    handleGetDetailPosts(id);
  }, [id]);
  useEffect(() => {
    handleGetPostsSimilar(id);
  }, [id]);
  return (
    <div className="flex items-start gap-5 max-lg:flex-col">
      {loading ? (
        <div className="flex flex-col max-lg:w-full gap-5 items-start w-[70%]">
          <LoadingSkeleton width="100%" height="400px" />
          <div className="flex items-center gap-3">
            <LoadingSkeleton width="50px" height="50px" radius="100%" />
            <div className="flex flex-col items-start gap-2 ">
              <LoadingSkeleton width="80px" height="10px" />
              <LoadingSkeleton width="80px" height="10px" />
              {currentUser?.username === detailPosts?.username && (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSkeleton width="15px" height="15px" />
                  <LoadingSkeleton width="15px" height="15px" />
                </div>
              )}
            </div>
          </div>
          <div className="text-[44px] max-md:text-4xl font-bold">
            <LoadingSkeleton width="700px" height="30px" />
          </div>
          <div className="text-xl text-textColor">
            <LoadingSkeleton width="700px" height="200px" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col max-lg:w-full gap-5 items-start w-[70%]">
          <div className="w-full">
            <img src={detailPosts?.img} className="w-full max-h-[400px]" />
          </div>
          <div className="flex items-center gap-3">
            <img
              className="w-[50px] h-[50px] rounded-full"
              src={detailPosts?.avatar || avatar}
            />
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold">{detailPosts?.username}</span>
              <span className="text-sm font-bold">
                {moment(detailPosts?.date).format("YYYY-MM-DD")}
              </span>
              {currentUser?.username === detailPosts?.username && (
                <div className="flex items-center justify-center gap-2">
                  <Link
                    to={`/write?edit=${detailPosts?.id}`}
                    state={detailPosts}
                  >
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
                      onClick={() => handleDeletePosts(token, id)}
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
      )}
      <div className="flex-1 max-lg:w-full ">
        <h3 className="text-2xl font-bold text-center">Bài viết liên quan</h3>
        <div className="grid grid-cols-1 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {loading ? (
            <div className="grid grid-cols-1 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
              <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
                <LoadingSkeleton height="200px" borderRadius="5px" />
                <LoadingSkeleton height="30px" borderRadius="5px" />
              </div>
              <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
                <LoadingSkeleton height="200px" borderRadius="5px" />
                <LoadingSkeleton height="30px" borderRadius="5px" />
              </div>
              <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
                <LoadingSkeleton height="200px" borderRadius="5px" />
                <LoadingSkeleton height="30px" borderRadius="5px" />
              </div>
              <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
                <LoadingSkeleton height="200px" borderRadius="5px" />
                <LoadingSkeleton height="30px" borderRadius="5px" />
              </div>
              <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
                <LoadingSkeleton height="200px" borderRadius="5px" />
                <LoadingSkeleton height="30px" borderRadius="5px" />
              </div>
              <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
                <LoadingSkeleton height="200px" borderRadius="5px" />
                <LoadingSkeleton height="30px" borderRadius="5px" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
              {postsSimilar &&
                postsSimilar.length > 0 &&
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
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
