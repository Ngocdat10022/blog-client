import React, { createContext, useContext, useState } from "react";
import { searchPosts } from "../service/posts";
const postContext = createContext();
const PostContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState();
  const [posts, setPosts] = useState([]);
  const handleSearchPost = async (query) => {
    const data = await searchPosts(searchValue || query);
    setPosts(data);
  };
  const handleSetSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <postContext.Provider
      value={{
        searchValue,
        setSearchValue,
        handleSearchPost,
        posts,
        handleSetSearch,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(postContext);
};
export default PostContextProvider;
