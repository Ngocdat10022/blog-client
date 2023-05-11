import React, { useEffect } from "react";
import { usePostsContext } from "../../context/postContext";
import { useLocation } from "react-router-dom";
import Heading from "../../components/Heading";
import List from "../../components/List";
import Card from "../../components/Card";
import LoadingSkeleton from "../../components/LoadingSkeleton";

const SearchPage = () => {
  const { search } = useLocation();
  const { handleSearchPost, postsSearch, loading } = usePostsContext();

  useEffect(() => {
    handleSearchPost(search);
  }, [search]);

  return (
    <div>
      <Heading name="Bài Viết" />
      {!loading ? (
        <List>
          {postsSearch &&
            postsSearch.length > 0 &&
            postsSearch.map((post) => {
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
      ) : (
        <List>
          <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
            <LoadingSkeleton height="200px" borderRadius="5px" />
            <LoadingSkeleton height="50px" borderRadius="5px" />
          </div>
          <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
            <LoadingSkeleton height="200px" borderRadius="5px" />
            <LoadingSkeleton height="50px" borderRadius="5px" />
          </div>
          <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
            <LoadingSkeleton height="200px" borderRadius="5px" />
            <LoadingSkeleton height="50px" borderRadius="5px" />
          </div>
          <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
            <LoadingSkeleton height="200px" borderRadius="5px" />
            <LoadingSkeleton height="50px" borderRadius="5px" />
          </div>{" "}
          <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
            <LoadingSkeleton height="200px" borderRadius="5px" />
            <LoadingSkeleton height="50px" borderRadius="5px" />
          </div>{" "}
          <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
            <LoadingSkeleton height="200px" borderRadius="5px" />
            <LoadingSkeleton height="50px" borderRadius="5px" />
          </div>
        </List>
      )}
    </div>
  );
};

export default SearchPage;
