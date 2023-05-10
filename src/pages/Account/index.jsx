import React, { useEffect } from "react";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import useUploaImage from "../../hooks/useUploadImage";
import avatar from "../../../public/image/profile-avatar.png";
import FiledInput from "../../components/FiledInput";

const Account = () => {
  const { handleChangeImage, image, loading } = useUploaImage();
  const {
    token,
    currentUser,
    logout,
    handleSetValueProfile,
    valuesProfile,
    handleUpdateProfile,
    handleSetValuesPass,
    valuesPass,
    handleChangePassword,
    isChangePassword,
    setIsChangePassword,
  } = useAuthContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/");
  });

  return (
    <div className="flex items-center justify-center w-full ">
      <div className="bg-whiteColor border-2 border-mainColor border-solid rounded-md w-[90%] my-20 h-auto p-2">
        <h3 className="p-4 text-4xl font-semibold text-center">
          Tài Khoản của tôi
        </h3>
        <div className="flex items-center justify-around w-full gap-5 max-lg:flex-col">
          <div className="flex flex-col gap-4">
            <div className="relative w-[300px] max-sm:w-[200px] h-[300px] max-sm:h-[200px] rounded-full overflow-hidden ">
              <img
                src={`${image || currentUser?.avatar || avatar}`}
                className="w-full h-full bg-cover "
              />
              {loading && (
                <div
                  className={`flex items-center justify-center absolute  bg-textColor/50  inset-0 rounded-full transition-all duration-150 ease-out `}
                >
                  <div className="z-100 animate-spin w-[50px] h-[50px] rounded-full border-4 border-x-textColor border-solid border-whiteColor"></div>
                </div>
              )}
            </div>
            <label
              htmlFor="upload"
              className="border-2 border-solid h-[50px] cursor-pointer border-mainColor flex items-center justify-center"
            >
              Cập nhật hình ảnh
              <input
                type="file"
                id="upload"
                className="hidden"
                onChange={handleChangeImage}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <div className="flex items-center gap-2">
              <span>Tên đăng nhập:</span>
              <span className="text-lg font-semibold">{`${currentUser?.username}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Email:</span>
              <span className="text-lg font-semibold">{`${currentUser?.email}`}</span>
            </div>
            <FiledInput
              lable="Chỉnh sửa tên đăng nhập:"
              className="flex-col gap-2"
              type="text"
              name="username"
              value={valuesProfile?.username}
              placeholder="Tên đăng nhập"
              onChange={handleSetValueProfile}
            />
            <FiledInput
              lable="Chỉnh sửa email:"
              className="flex-col gap-2"
              type="email"
              name="email"
              value={valuesProfile?.email}
              placeholder="Email"
              onChange={handleSetValueProfile}
            />
            {isChangePassword ? (
              <>
                <FiledInput
                  lable="Mật khẩu:"
                  className="flex-col gap-2"
                  type="password"
                  name="password"
                  value={valuesPass?.password}
                  placeholder="Password"
                  onChange={handleSetValuesPass}
                />
                <FiledInput
                  lable="Mật khẩu mới:"
                  className="flex-col gap-2"
                  type="password"
                  value={valuesPass?.newPassword}
                  name="newPassword"
                  placeholder="Password"
                  onChange={handleSetValuesPass}
                />
                <div className="flex items-center justify-center w-full gap-5 ">
                  <button
                    onClick={() => handleChangePassword(token)}
                    className="px-6 py-2 w-[200px] rounded-md bg-mainColor text-whiteColor "
                  >
                    Đổi mật khẩu
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center w-full gap-5 ">
                <button
                  onClick={() => setIsChangePassword(!isChangePassword)}
                  className="px-6 py-2 w-[200px] rounded-md bg-whiteColor text-mainColor "
                >
                  Đổi mật khẩu
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 mt-10">
          <button
            onClick={logout}
            className="px-6 py-2 rounded-md bg-mainColor text-whiteColor"
          >
            Đăng Xuất
          </button>
          <button
            onClick={() => handleUpdateProfile(image)}
            className="px-6 py-2 bg-red-600 border-2 border-solid rounded-md text-textColor border-mainColor"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
