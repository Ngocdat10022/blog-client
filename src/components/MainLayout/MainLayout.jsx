import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import WrapperPage from "../WrapperPage";

const MainLayout = () => {
  return (
    <WrapperPage>
      <Header></Header>
      <Outlet />
      <Footer />
    </WrapperPage>
  );
};

export default MainLayout;
