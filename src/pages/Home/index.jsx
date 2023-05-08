import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Heading from "../../components/Heading";
import List from "../../components/List";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import { getPosts } from "../../service/posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    getPosts(search).then((data) => {
      setPosts(data);
    });
  }, [search]);
  return (
    <div className="wrapper-home ">
      <div className="flex items-center gap-5">
        <div className="flex flex-col gap-4">
          <h3 className="text-[60px] font-bold">
            Create a good article on any topic
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
      <Heading name="Posts" />
      <List>
        {posts.length > 0 &&
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
    </div>
  );
};

export default Home;
