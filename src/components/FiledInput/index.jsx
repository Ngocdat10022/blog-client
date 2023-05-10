import React, { useState } from "react";
import EyeIcon from "../../../public/Icons/EyeIcon";
import EyelSash from "../../../public/Icons/EyelSash";
const FiledInput = ({ lable, name, type, onChange, value, className }) => {
  const [isPassword, setIsPassword] = useState(false);
  return type === "password" ? (
    <div className={`relative flex  w-full filed ${className}`}>
      <span className="text-base ">{lable}</span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={isPassword ? "text" : "password"}
        className="flex-1 p-4 pr-8 border-none rounded-md outline-none input bg-grayColor"
      />
      <span
        className="absolute pl-5 cursor-pointer select-none right-2 top-2/4 "
        onClick={() => setIsPassword(!isPassword)}
      >
        {isPassword ? <EyeIcon /> : <EyelSash />}
      </span>
    </div>
  ) : (
    <div className={`relative flex  w-full filed ${className}`}>
      <span className="text-base ">{lable}</span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="flex-1 p-4 border-none rounded-md outline-none input bg-grayColor"
      />
    </div>
  );
};

export default FiledInput;
