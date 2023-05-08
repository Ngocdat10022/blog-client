import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../../../public/Icons/SearchIcon";
import useLocalStorage from "../../hooks/useLocalStorage";
import logo from "../../../public/image/blog-logo.png";
import avatar from "../../../public/image/avatar.jpg";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/authContext";

const Header = () => {
  const navigate = useNavigate();

  const { token, currentUser } = useAuthContext();
  const handleWrite = () => {
    if (!token) toast.warning("Vui lòng đăng nhập");
    if (token) navigate("/write");
  };
  return (
    <header className="header h-[80px] w-full bg-whiteColor flex items-center justify-between pl-5 pr-5 ">
      <div className="">
        <Link to="/">
          <img src={logo} alt="logo" width={60} height={60} />
        </Link>
      </div>
      <nav className="flex items-center gap-3">
        <ul className="flex items-center gap-3">
          <li>
            <Link to="/?cat=art" className="hover:text-mainColor">
              ART
            </Link>
          </li>
          <li>
            <Link to="/?cat=cook" className="hover:text-mainColor">
              COOK
            </Link>
          </li>
          <li>
            <Link to="/?cat=technology" className="hover:text-mainColor">
              TECHNOLOGY
            </Link>
          </li>
          <li>
            <Link to="/?cat=film" className="hover:text-mainColor">
              FILM
            </Link>
          </li>
          <li>
            <Link to="/?cat=science" className="hover:text-mainColor">
              SCIENCE
            </Link>
          </li>
          <li>
            <Link to="/?cat=design" className="hover:text-mainColor">
              DESIGN
            </Link>
          </li>
          <li>
            <Link to="/?cat=food" className="hover:text-mainColor">
              FOOD
            </Link>
          </li>
          <li>
            <Link to="/?cat=cienna" className="hover:text-mainColor">
              CIENNA
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-2 ml-8 border-b outline-none search border-mainColor">
          <SearchIcon className="w-6 h-6" />
          <input className="outline-none " placeholder="Search posts" />
        </div>
      </nav>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="cursor-pointer avatar">
            <Link to="/account">
              <img
                className="rounded-full w-[50px] bg-cover  h-[50px]"
                src={`${currentUser?.avatar}`}
                alt="avatar"
                width={60}
                height={60}
              />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button name="Login" to="login" />
            <Button name="Register" to="register" />
          </div>
        )}
        <div>
          <button
            onClick={handleWrite}
            className="w-[60px] h-[60px] rounded-full bg-mainColor text-whiteColor text-sm"
          >
            Write
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
