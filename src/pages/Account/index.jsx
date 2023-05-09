import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import useUploaImage from "../../hooks/useUploadImage";
import { changePassword, updateProfile } from "../../service/user";
import avatar from "../../../public/image/profile-avatar.png";
import { toast } from "react-toastify";
import FiledInput from "../../components/FiledInput";

const Account = () => {
  const { token, currentUser, logout, setAccessToken, setUser } =
    useAuthContext();
  const [username, setUserName] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email);
  const { handleChangeImage, image, loading } = useUploaImage();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangePassword, setIsChangePassword] = useState(false);

  console.log("password", password, newPassword);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/");
  });
  const values = { username, email };
  console.log("values", values);
  const handleUpdateProfile = async () => {
    const data = await updateProfile(
      { ...values, avatar: image || currentUser?.avatar },
      token
    );
    if (data) {
      console.log("data", data);
      setAccessToken(data?.accessToken);
      setUser(data?.findUser);
      toast.success("Update Profile successfully");
    }
  };

  const handleChangePassword = async () => {
    const data = await changePassword({ password, newPassword }, token);
    if (data) toast.success("Change password successfully");
    setIsChangePassword(!isChangePassword);
  };
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
              value={username}
              placeholder="Tên đăng nhập"
              onChange={(e) => setUserName(e.target.value)}
            />
            <FiledInput
              lable="Chỉnh sửa email:"
              className="flex-col gap-2"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {isChangePassword ? (
              <>
                <FiledInput
                  lable="Mật khẩu:"
                  className="flex-col gap-2"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FiledInput
                  lable="Mật khẩu mới:"
                  className="flex-col gap-2"
                  type="password"
                  value={newPassword}
                  placeholder="Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="flex items-center justify-center w-full gap-5 ">
                  <button
                    onClick={handleChangePassword}
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
            onClick={handleUpdateProfile}
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
