import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addPosts,
  deletePosts,
  getDetailPosts,
  getPosts,
  getPostsSimilar,
  searchPosts,
  updatePosts,
} from "../service/posts";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const postContext = createContext();

const sleep = (ms) => () =>
  new Promise((resolve, reject) => setTimeout(resolve, ms));
const PostContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState();
  const [postsSearch, setPostsSearch] = useState([]);
  const [detailPosts, setDetailPosts] = useState([]);
  const [postsSimilar, setPostsSimilar] = useState([]);
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();

  const handleSearchPost = async (query) => {
    setLoading(true);
    const data = await searchPosts(searchValue || query);
    if (Array.isArray(data)) {
      setPostsSearch(data);
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  const handleSetSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleAddPosts = async (state, values, token) => {
    if (state) {
      const idPosts = state?.id;
      const data = await updatePosts(values, token, idPosts);
      if (data) {
        toast.success("Update posts successfully");
        navigate("/");
      }
    } else {
      const data = await addPosts(values, token);
      if (data) {
        toast.success("addPosts successfully");
        navigate("/");
      }
    }
  };

  const handleGetPosts = async () => {
    setLoading(true);
    const data = await getPosts(search);
    if (Array.isArray(data)) {
      setPosts(data);
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  const handleGetDetailPosts = async (id) => {
    setLoading(true);
    const data = await getDetailPosts(id);

    if (Array.isArray(data)) {
      setDetailPosts(data[0]);
      setLoading(false);
    } else {
      setLoading(true);
    }
  };
  const handleGetPostsSimilar = async (id) => {
    setLoading(true);
    const data = await getPostsSimilar(id);

    if (Array.isArray(data)) {
      setPostsSimilar(data);
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  const handleDeletePosts = async (token, id) => {
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
        const data = await deletePosts(token, id);
        if (data) Swal.fire(`${data}`);
        navigate("/");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };

  return (
    <postContext.Provider
      value={{
        detailPosts,
        postsSimilar,
        handleDeletePosts,
        handleGetDetailPosts,
        handleGetPostsSimilar,
        handleGetPosts,
        loading,
        posts,
        handleAddPosts,
        searchValue,
        setSearchValue,
        handleSearchPost,
        postsSearch,
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
