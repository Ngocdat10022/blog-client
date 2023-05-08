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
    toast.error(`${error?.response?.data}`);
    console.log("err", error);
  }
};
