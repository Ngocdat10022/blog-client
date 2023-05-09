import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import useUploaImage from "../../hooks/useUploadImage";
import { changePassword, updateProfile } from "../../service/user";
import avatar from "../../../public/image/avatar.jpg";
import { toast } from "react-toastify";

const Account = () => {
  const { token, currentUser, logout, setAccessToken, setUser } =
    useAuthContext();
  const [username, setUserName] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email);
  const { handleChangeImage, image } = useUploaImage();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangePassword, setIsChangePassword] = useState(false);

  console.log("password", password, newPassword);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/");
  });
  const values = { username, email };

  const handleUpdateProfile = async () => {
    const data = await updateProfile({ ...values, avatar: image }, token);
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
      <div className="bg-whiteColor border-2 border-mainColor border-solid rounded-md w-[70%] h-auto p-5">
        <h3 className="p-4 text-4xl font-semibold text-center">
          Tài Khoản của tôi
        </h3>
        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-4">
            <div className="w-[300px] h-[300px] ">
              <img
                src={`${image || currentUser?.avatar || avatar}`}
                className="w-full h-full bg-cover rounded-full"
              />
            </div>
            <label
              htmlFor="upload"
              className="border-2 border-solid h-[50px] cursor-pointer border-mainColor flex items-center justify-center"
            >
              Upload image
              <input
                type="file"
                id="upload"
                className="hidden"
                onChange={handleChangeImage}
              />
            </label>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2">
              <span>Tên đăng nhập:</span>
              <span className="text-lg font-semibold">{`${currentUser?.username}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Chỉnh sửa tên đăng nhập:</span>
              <input
                type="text"
                value={username}
                placeholder="Tên đăng nhập"
                className="w-full p-3 border-2 border-solid h-[50px] flex-1  border-mainColor outline-none"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span>Email:</span>
              <span className="text-lg font-semibold">{`${currentUser?.email}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Chỉnh sửa email:</span>
              <input
                type="email"
                value={email}
                placeholder="Tên đăng nhập"
                className="w-full p-3 border-2 border-solid h-[50px] flex-1  border-mainColor outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {isChangePassword ? (
              <>
                <div className="flex items-center gap-2">
                  <span>Mật Khẩu</span>
                  <input
                    type="text"
                    value={password}
                    placeholder="Mật khẩu"
                    className="w-full p-3 border-2 border-solid h-[50px] flex-1  border-mainColor outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 ju">
                  <span>Mật Khẩu Mới</span>
                  <input
                    type="text"
                    value={newPassword}
                    placeholder="Mật khẩu mới"
                    className="w-full p-3 border-2 border-solid h-[50px] flex-1  border-mainColor outline-none"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
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
            Logout
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
