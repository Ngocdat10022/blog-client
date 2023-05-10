import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Write from "../pages/Write";
import Account from "../pages/Account";
import MainLayout from "../components/MainLayout/MainLayout";
import DetailPost from "../pages/DetailPosts";
import SearchPage from "../pages/Search";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/account" element={<Account />} />
        <Route path="/posts/:id" element={<DetailPost />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
