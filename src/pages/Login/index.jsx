import React, { useState } from "react";
import { Link } from "react-router-dom";
import FiledInput from "../../components/FiledInput";
import { useAuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    errName: null,
    errPass: null,
  });

  const onChangeValue = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login, loading } = useAuthContext();

  const handlelogin = async (e) => {
    e.preventDefault();
    if (!values?.username.trim() || !values?.password.trim()) {
      setError((prev) => ({
        ...prev,
        errName: "Không được để trống",
        errPass: "Không được để trống",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        errName: null,
        errPass: null,
      }));
      // e.preventDefault();
      await login(values);
    }
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
            className="flex-col "
            name="username"
            lable="Tên đăng nhập"
            type="text"
            onChange={onChangeValue}
            errorMessage={error?.errName}
          />
          <FiledInput
            className="flex-col"
            name="password"
            lable="Mật Khẩu"
            type="password"
            onChange={onChangeValue}
            errorMessage={error?.errPass}
          />
          <button
            onClick={handlelogin}
            className="flex items-center justify-center w-full p-2 mt-3 cursor-pointer text-whiteColor bg-mainColor"
          >
            <span>
              {loading ? (
                <div
                  className="w-[30px] h-[30px] border-whiteColor border-2 border-solid animate-spin rounded-full border-x-mainColor"
                  onClick={handlelogin}
                ></div>
              ) : (
                "Đăng Nhập"
              )}
            </span>
          </button>
          <Link className="block m-3 text-center text-mainColor" to="/register">
            Đăng Kí tại đây!
          </Link>
        </form>
      </div>
    </>
  );
};
export default Login;
