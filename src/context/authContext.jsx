import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { changePassword, updateProfile } from "../service/user";

const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const URL = "http://localhost:4000/api/auth";

  const [user, setUser] = useLocalStorage("user", {});
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [currentUser, setCurrentUser] = useState(user);
  const [token, setToken] = useState(accessToken);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [valuesProfile, setValuesProfile] = useState({
    username: currentUser?.username,
    email: currentUser?.email,
  });

  const [valuesPass, setValuesPass] = useState({
    password: "",
    newPassword: "",
  });

  const handleSetValueProfile = (e) => {
    setValuesProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSetValuesPass = (e) => {
    setValuesPass((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  useEffect(() => {
    auth;
  });

  const register = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post(`${URL}/register`, values);
      setLoading(false);
      return res.data;
    } catch (error) {
      if (error?.response?.data) {
        toast.error(`${error?.response?.data}`);
      } else {
        toast.error(`${error?.message}`);
      }
      setLoading(false);
    }
  };

  const login = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post(`${URL}/login`, values);
      setAccessToken(res?.data?.accessToken);
      setUser(res?.data?.findUser);
      setLoading(false);
      toast("Login successfully");
      navigate("/");
    } catch (error) {
      if (error?.response?.data) {
        toast.error(`${error?.response?.data}`);
      } else {
        toast.error(`${error?.message}`);
      }
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setAccessToken(null);
    navigate("/");
  };

  const handleUpdateProfile = async (image) => {
    setLoading(true);
    const data = await updateProfile(
      { ...valuesProfile, avatar: image || currentUser?.avatar },
      token
    );
    if (data.hasOwnProperty("findUser")) {
      setAccessToken(data?.accessToken);
      setUser(data?.findUser);
      toast.success("Update Profile successfully");
      setLoading(false);
    } else {
      setLoading(false);
      if (data?.response?.data) {
        toast.error(`${data?.response?.data?.message}`);
      } else {
        toast.error(`${data?.message}`);
      }
    }
  };

  const handleChangePassword = async (token) => {
    const data = await changePassword(valuesPass, token);
    if (typeof data === "string") {
      toast.success(`${data}`);
      setIsChangePassword(!isChangePassword);
    } else {
      if (data?.response?.data?.message) {
        toast.error(`${data?.response?.data?.message}`);
      } else {
        toast.error(`${data?.message}`);
      }
    }
  };
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    setToken(accessToken);
  }, [accessToken]);

  return (
    <authContext.Provider
      value={{
        login,
        currentUser,
        logout,
        token,
        setAccessToken,
        setUser,
        handleSetValueProfile,
        valuesProfile,
        handleUpdateProfile,
        handleSetValuesPass,
        valuesPass,
        handleChangePassword,
        isChangePassword,
        setIsChangePassword,
        register,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(authContext);
};

export default AuthContextProvider;
