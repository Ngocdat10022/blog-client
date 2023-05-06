import React from "react";
import { Link } from "react-router-dom";

const Button = ({ name, to }) => {
  return (
    <Link
      to={to}
      className="pt-2 pb-2 pl-4 pr-4 rounded-md bg-mainColor text-whiteColor"
    >
      {name}
    </Link>
  );
};

export default Button;
