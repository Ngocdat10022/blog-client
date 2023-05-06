import React, { useState } from "react";
import { Link } from "react-router-dom";
import FiledInput from "../../components/FiledInput";
import { useAuthContext } from "../../context/authContext";
const Login = () => {
  const [value, setValue] = useState({ username: "", email: "", password: "" });
  const onChangeValue = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useAuthContext();

  const handlelogin = async (e) => {
    e.preventDefault();
    await login(value);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center p-5 wrapper-login h-[100vh] bg-mainColor ">
        <div className="p-4 login-logo">
          <Link to="/">
            <img
              src="./image/blog-logo.png"
              height={100}
              width={100}
              alt="blog-logo"
            />
          </Link>
        </div>
        <form className="login-form w-[400px] h-auto p-4 bg-whiteColor rounded-lg shadow-2xl">
          <h3 className="mb-5 text-[30px] font-bold text-center text-mainColor    ">
            Login
          </h3>
          <FiledInput
            name="username"
            lable="Username"
            type="text"
            onChange={onChangeValue}
          />
          <FiledInput
            name="password"
            lable="password"
            type="password"
            onChange={onChangeValue}
          />
          <button
            onClick={handlelogin}
            className="flex items-center justify-center w-full p-2 mt-3 cursor-pointer text-whiteColor bg-mainColor"
          >
            <span>Login</span>
          </button>
          <Link className="block m-3 text-center text-mainColor" to="/register">
            Register here
          </Link>
        </form>
      </div>
    </>
  );
};
export default Login;
