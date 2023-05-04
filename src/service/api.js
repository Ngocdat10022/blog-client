import axios from "axios";
import { toast } from "react-toastify";

export const URL = "http://localhost:4000/api/auth";

export const register = async (value) => {
  try {
    const res = await axios.post(`${URL}/register`, value);
    if (res?.data) toast.success(`${res?.data}`);
  } catch (error) {
    console.log("error", error);
  }
};
