import React, { useState } from "react";
import { Link } from "react-router-dom";
import FiledInput from "../../components/FiledInput";

const Register = () => {
  const [value, setValue] = useState({ username: "", email: "", password: "" });
  const onChangeValue = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log("value", value);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("values", value);
  };
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] p-5 wrapper-login bg-mainColor ">
      <div className="p-4 login-logo">
        <img
          src="./image/blog-logo.png"
          height={100}
          width={100}
          alt="blog-logo"
        />
      </div>
      <form className="register-form w-[400px] h-auto p-4 bg-whiteColor rounded-lg shadow-2xl">
        <h3 className="mb-5 text-[30px] font-bold text-center text-mainColor    ">
          Register Account
        </h3>
        <FiledInput
          name="username"
          lable="Username"
          type="text"
          onChange={onChangeValue}
        />
        <FiledInput
          name="email"
          lable="Email"
          type="email"
          onChange={onChangeValue}
        />
        <FiledInput
          name="password"
          lable="password"
          type="password"
          onChange={onChangeValue}
        />
        <button
          onClick={handleRegister}
          className="flex items-center justify-center w-full p-2 mt-3 cursor-pointer text-whiteColor bg-mainColor"
        >
          <span>Register</span>
        </button>
        <span>
          <Link className="block m-3 text-center text-mainColor" to="/login">
            Login here
          </Link>
        </span>
        <div className="flex items-center justify-center p-2 cursor-pointer text-whiteColor bg-mainColor">
          <img
            src="./image/Google__G__Logo.svg.png"
            width={20}
            height={20}
            className="mr-4"
          />
          <span>Login with google</span>
        </div>
      </form>
    </div>
  );
};

export default Register;
