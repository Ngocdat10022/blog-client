import React, { useEffect, useState } from "react";
import { usePostsContext } from "../../context/postContext";
import { useLocation } from "react-router-dom";
import Heading from "../../components/Heading";
import List from "../../components/List";
import Card from "../../components/Card";

const SearchPage = () => {
  const { search } = useLocation();
  const { searchValue, handleSearchPost, posts } = usePostsContext();

  useEffect(() => {
    handleSearchPost(search);
  }, [search]);

  return (
    <div>
      <Heading name="Bài Viết" />
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

export default SearchPage;
