import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FiledInput from "../../components/FiledInput";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/authContext";

const Register = () => {
  const { register, loading } = useAuthContext();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    errName: null,
    errEmail: null,
    errPass: null,
  });

  const onChangeValue = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !values?.username.trim() ||
      !values?.password.trim() ||
      !values?.email.trim()
    ) {
      setError((prev) => ({
        ...prev,
        errName: "Không được để trống",
        errEmail: "Không được để trống ",
        errPass: "Không được để trống",
      }));
    } else {
      const isPass = values?.password.trim().length < 8;
      const isEmail = values?.email.includes("@gmail.com");
      if (!isEmail)
        setError((prev) => ({
          ...prev,
          errName: null,
          errEmail: "Email không hợp lệ",
          errPass: null,
        }));
      if (isPass)
        setError((prev) => ({
          ...prev,
          errName: null,
          errEmail: null,
          errPass: "Mật khẩu phải lớn hơn 8 kí tự",
        }));
      if (isEmail && !isPass) {
        const data = await register(values);
        if (data) {
          toast.success(`${data}`);
          navigate("/login");
        }
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] p-5 wrapper-login bg-mainColor ">
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
      <form className="register-form w-[400px] h-auto p-4 bg-whiteColor rounded-lg shadow-2xl">
        <h3 className="mb-5 text-[30px] font-bold text-center text-mainColor    ">
          Đăng Kí Tài Khoản
        </h3>
        <FiledInput
          className="flex-col"
          name="username"
          lable="Tên đăng nhập"
          type="text"
          onChange={onChangeValue}
          errorMessage={error?.errName}
        />
        <FiledInput
          className="flex-col"
          name="email"
          lable="Email"
          type="email"
          onChange={onChangeValue}
          errorMessage={error?.errEmail}
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
          onClick={handleRegister}
          className="flex items-center justify-center w-full p-2 mt-3 cursor-pointer text-whiteColor bg-mainColor"
        >
          <span>
            {loading ? (
              <div className="w-[30px] h-[30px] border-whiteColor border-2 border-solid animate-spin rounded-full border-x-mainColor"></div>
            ) : (
              "Đăng Kí"
            )}
          </span>
        </button>
        <span>
          <Link className="block m-3 text-center text-mainColor" to="/login">
            Đăng nhập tại đây!
          </Link>
        </span>
        <div className="flex items-center justify-center p-2 cursor-pointer text-whiteColor bg-mainColor">
          <img
            src="./image/Google__G__Logo.svg.png"
            width={20}
            height={20}
            className="mr-4"
          />
          <span>Đăng nhập với google</span>
        </div>
      </form>
    </div>
  );
};

export default Register;
