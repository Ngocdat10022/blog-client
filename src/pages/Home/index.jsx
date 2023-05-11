import React, { useEffect } from "react";
import Heading from "../../components/Heading";
import List from "../../components/List";
import Card from "../../components/Card";
import { usePostsContext } from "../../context/postContext";
import { useLocation } from "react-router-dom";
import LoadingSkeleton from "../../components/LoadingSkeleton";

const Home = () => {
  const { search } = useLocation();

  const { posts, loading, handleGetPosts } = usePostsContext();
  useEffect(() => {
    handleGetPosts();
  }, [search]);

  return (
    <div className="wrapper-home">
      <div className="flex items-center gap-5 max-md:flex-col-reverse">
        <div className="flex flex-col gap-4">
          <h3 className="text-[60px] max-md:text-5xl font-bold">
            Tạo một bài viết hay về bất kỳ chủ đề nào
          </h3>
          <h5 className="text-xl text-textColor">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
            placeat ipsam accusamus autem odio quas qui
          </h5>
        </div>
        <div>
          <img src="./image/blog1.jpg" alt="logo" width={1600} height={1600} />
        </div>
      </div>
      <Heading name="Bài Viết" />

      {loading ? (
        <List>
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
        </List>
      ) : (
        <List>
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <Card
                  key={post?.id}
                  title={post?.title}
                  src={post?.img}
                  id={post?.id}
                />
              );
            })}
        </List>
      )}
    </div>
  );
};

export default Home;
