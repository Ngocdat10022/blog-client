import axios from "axios";

const URL = `http://localhost:4000/api`;

export const searchPosts = async (query) => {
  const isQuery = query.includes("?name");
  if (!isQuery) {
    try {
      const res = await axios.get(`${URL}/posts/search/?name=${query}`);
      const data = res?.data;
      return data;
    } catch (error) {
      console.log("error", error);
    }
  } else {
    try {
      const res = await axios.get(`${URL}/posts/search/${query}`);
      const data = res?.data;
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
};

export const getPosts = async (query) => {
  try {
    const res = await axios.get(`${URL}/posts${query}`);
    const data = res?.data;
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDetailPosts = async (idPosts) => {
  try {
    const res = await axios.get(`${URL}/posts/${idPosts}`);
    const data = res?.data;
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const getPostsSimilar = async (idPosts) => {
  try {
    const res = await axios.get(`${URL}/posts/similar/${idPosts}`);
    const data = res?.data;
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const addPosts = async (values, token) => {
  try {
    const res = await axios.post(`${URL}/posts/addposts`, values, {
      headers: {
        Authorization: token,
      },
    });
    const data = res?.data;
    return data;
  } catch (error) {
    if (error?.response?.data) {
      toast.error(`${error?.response?.data}`);
    } else {
      toast.error(`${error?.message}`);
    }
  }
};

export const updatePosts = async (values, token, id) => {
  try {
    const res = await axios.put(`${URL}/posts/updatePosts/${id}`, values, {
      headers: {
        Authorization: token,
      },
    });
    const data = res?.data;
    return data;
  } catch (error) {
    if (error?.response?.data) {
      toast.error(`${error?.response?.data}`);
    } else {
      toast.error(`${error?.message}`);
    }
  }
};

export const deletePosts = async (token, id) => {
  try {
    const res = await axios.delete(`${URL}/posts/deletePosts/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    const data = res?.data;
    return data;
  } catch (error) {
    if (error?.response?.data) {
      toast.error(`${error?.response?.data}`);
    } else {
      toast.error(`${error?.message}`);
    }
  }
};
