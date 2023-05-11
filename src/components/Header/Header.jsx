import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../../../public/Icons/SearchIcon";
import CloseIcon from "../../../public/Icons/CloseIcon";
import ListIcon from "../../../public/Icons/ListIcon";
import logo from "../../../public/image/blog-logo.png";
import { toast } from "react-toastify";
import Button from "../Button";
import avatar from "../../../public/image/profile-avatar.png";
import { useAuthContext } from "../../context/authContext";
import { usePostsContext } from "../../context/postContext";

const Header = () => {
  const [isShowNav, setShowNav] = useState(false);

  const handleShowNav = () => {
    setShowNav(!isShowNav);
  };
  const navigate = useNavigate();

  const { token, currentUser } = useAuthContext();
  const { searchValue, handleSetSearch, handleSearchPost } = usePostsContext();

  const handleWrite = () => {
    if (!token) toast.warning("Vui lòng đăng nhập");
    if (token) navigate("/write");
  };

  const listNav = [
    {
      to: "/?cat=đầu bếp",
      name: "Đầu Bếp",
    },
    {
      to: "/?cat=công nghệ",
      name: "Công Nghệ",
    },
    {
      to: "/?cat=điện ảnh",
      name: "Điện Ảnh",
    },
    {
      to: "/?cat=khoa học",
      name: "Khoa Học",
    },
    {
      to: "/?cat=thiết kế",
      name: "Thiết Kế",
    },
    {
      to: "/?cat=đồ ăn",
      name: "Đồ Ăn",
    },
  ];
  return (
    <header className="header h-[80px] w-full bg-whiteColor flex items-center justify-between ">
      <span className="cursor-pointer lg:hidden" onClick={handleShowNav}>
        <ListIcon className="w-8" />
      </span>
      <div className="">
        <Link to="/">
          <img src={logo} alt="logo" width={60} height={60} />
        </Link>
      </div>
      <nav
        className={`flex items-center gap-3 max-lg:z-10 max-lg:bg-whiteColor max-lg:p-5 transtion transition-all duration-150 max-lg:gap-6 max-lg:fixed max-lg:left-0 max-lg:bottom-0 max-lg:shadow-xl max-lg:top-0 ${
          isShowNav ? `max-lg:translate-x-0` : `max-lg:-translate-x-full`
        } max-lg:flex-col`}
      >
        <span
          className="absolute cursor-pointer top-2 right-2 lg:hidden"
          onClick={handleShowNav}
        >
          <CloseIcon />
        </span>
        <ul className="flex items-center gap-3 max-lg:flex-col">
          {listNav.length > 0 &&
            listNav.map((item) => {
              return (
                <li key={item?.name}>
                  <Link to={`${item?.to}`} className="hover:text-mainColor">
                    {item?.name}
                  </Link>
                </li>
              );
            })}
        </ul>
        <div className="flex items-center gap-2 ml-8 border-b outline-none search border-mainColor">
          <Link
            to={`/search/?name=${searchValue}`}
            onClick={() => {
              if (searchValue.length === 0) return null;
              handleSearchPost(searchValue);
            }}
          >
            <SearchIcon className="w-6 h-6" />
          </Link>
          <input
            value={searchValue}
            className="outline-none "
            placeholder="Tìm kiếm bài viết"
            onChange={handleSetSearch}
          />
        </div>
      </nav>

      <div className="flex items-center gap-4">
        {!!token ? (
          <div className="cursor-pointer avatar">
            <Link to="/account">
              <img
                className="rounded-full w-[50px] bg-cover  h-[50px]"
                src={`${currentUser?.avatar || avatar}`}
                alt="avatar"
                width={60}
                height={60}
              />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button name="Đăng Nhập" to="login" />
            <Button name="Đăng Kí" to="register" />
          </div>
        )}
        {!!token && (
          <div>
            <button
              onClick={handleWrite}
              className="w-[60px] h-[60px] rounded-full bg-mainColor text-whiteColor text-sm"
            >
              Viết Bài
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
