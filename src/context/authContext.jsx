import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../service/api";

const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", {});
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [currentUser, setCurrentUser] = useState(user);
  const navigate = useNavigate();
  const login = async (value) => {
    try {
      const res = await axios.post(`${URL}/login`, value);
      setUser(res?.data);
      setAccessToken(res?.data?.accessToken);
      toast("Login successfully");
      navigate("/");
    } catch (err) {
      console.log("error", err);

      if (err?.response?.data) toast.error(`${err?.response?.data}`);
    }
  };
  useEffect(() => {
    setCurrentUser(user);
  });
  return (
    <authContext.Provider value={{ login, currentUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(authContext);
};
export default AuthContextProvider;
