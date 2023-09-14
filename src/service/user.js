import axios from "axios";

const URL = `http://localhost:4000/api`;

export const updateProfile = async (values, token) => {
  try {
    const res = await axios.put(`${URL}/user/update`, values, {
      headers: {
        Authorization: token,
      },
    });
    const data = res?.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const changePassword = async (values, token) => {
  try {
    const res = await axios.put(`${URL}/user/updatepassword`, values, {
      headers: {
        Authorization: token,
      },
    });
    const data = res?.data;
    return data;
  } catch (error) {
    return error;
  }
};
