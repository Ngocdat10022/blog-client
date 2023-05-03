import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
const Router = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
