import axios from "axios";
import { toast } from "react-toastify";

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
    if (error?.response?.data) {
      toast.error(`${error?.response?.data}`);
    } else {
      toast.error(`${error?.message}`);
    }
    console.log("err", error);
  }
};

export const changePassword = async (values, token) => {
  try {
    const res = await axios.put(`${URL}/user/updatePassword`, values, {
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
    console.log("err", error);
  }
};
