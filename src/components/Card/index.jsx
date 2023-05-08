import React from "react";
import { Link } from "react-router-dom";

const Card = ({ src, title, id }) => {
  return (
    <div className="flex flex-col gap-4 p-5 rounded-md shadow-2xl card ">
      <div className="w-full flex-shrink-0 h-[200px]">
        <Link to={`/posts/${id}`}>
          <img src={src} alt="img" className="w-full h-full rounded-xl" />
        </Link>
      </div>
      <h3 className="flex-1 text-2xl font-bold text-textColor">{title}</h3>
    </div>
  );
};

export default Card;
