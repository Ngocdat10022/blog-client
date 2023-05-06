import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useLocalStorage from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import SearchIcon from "../../../public/Icons/SearchIcon";
import WrapperPage from "../../components/WrapperPage";
import Heading from "../../components/Heading";
import List from "../../components/List";
import Footer from "../../components/Footer";
import Card from "../../components/Card";

const Home = () => {
  const navigate = useNavigate();
  const [accessToken] = useLocalStorage("accessToken", "");
  const handleWrite = () => {
    if (!accessToken) toast.warning("Vui lòng đăng nhập");
    if (accessToken) navigate("/write");
  };
  return (
    <div className="wrapper-home ">
      <WrapperPage>
        <header className="header h-[80px] w-full bg-whiteColor flex items-center justify-between pl-5 pr-5 ">
          <div className="">
            <Link to="/">
              <img
                src="./image/blog-logo.png"
                alt="logo"
                width={60}
                height={60}
              />
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
            {accessToken ? (
              <div className="cursor-pointer avatar">
                <Link to="/account">
                  <img
                    className="rounded-full"
                    src="./image/avatar.jpg"
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
        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-4">
            <h3 className="text-[60px] font-bold">
              Create a good article on any topic
            </h3>
            <h5 className="text-xl text-textColor">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
              placeat ipsam accusamus autem odio quas qui
            </h5>
          </div>
          <div>
            <img
              src="./image/blog1.jpg"
              alt="logo"
              width={1600}
              height={1600}
            />
          </div>
        </div>
        <Heading name="Posts" />
        <List>
          <Card title="Cách có thu nhập cao trong ngành lập trình" />
          <Card title="Cách có thu nhập cao trong ngành lập trình" />
          <Card title="Cách có thu nhập cao trong ngành lập trình" />
          <Card title="Cách có thu nhập cao trong ngành lập trình" />
        </List>
        <Footer />
      </WrapperPage>
    </div>
  );
};

export default Home;
