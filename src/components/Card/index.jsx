import React from "react";
import { Link } from "react-router-dom";

const Card = ({ src, title }) => {
  return (
    <Link to="/posts/1">
      <div className="p-5 rounded-md shadow-2xl cursor-pointer card ">
        <div className="w-full">
          <img src="./image/blog1.jpg" alt="logo" />
          <h3 className="text-2xl font-bold text-textColor">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
