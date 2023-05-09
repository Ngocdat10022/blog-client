import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { URL } from "../service/auth";

const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", {});
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [currentUser, setCurrentUser] = useState(user);
  const [token, setToken] = useState(accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    auth;
  });

  const login = async (values) => {
    try {
      const res = await axios.post(`${URL}/login`, values);
      setAccessToken(res?.data?.accessToken);
      setUser(res?.data?.findUser);
      toast("Login successfully");
      navigate("/");
    } catch (err) {
      console.log("error", err);
      if (err?.response?.data) toast.error(`${err?.response?.data}`);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setAccessToken(null);
    navigate("/");
  };
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  useEffect(() => {
    setToken(accessToken);
  }, [accessToken]);
  return (
    <authContext.Provider
      value={{ login, currentUser, logout, token, setAccessToken, setUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(authContext);
};
export default AuthContextProvider;
