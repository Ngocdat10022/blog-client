import React, { useState } from "react";
import EyeIcon from "../../../public/Icons/EyeIcon";
import EyelSash from "../../../public/Icons/EyelSash";
const FiledInput = ({
  lable,
  name,
  type,
  onChange,
  value,
  className,
  errorMessage,
}) => {
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
        className={`absolute pl-5 cursor-pointer select-none right-2 top-2/4 ${
          errorMessage && "-translate-y-3"
        }`}
        onClick={() => setIsPassword(!isPassword)}
      >
        {isPassword ? <EyeIcon className="w-6 h-6" /> : <EyelSash />}
      </span>
      {errorMessage && <span className="text-errorColor">{errorMessage}</span>}
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
      {errorMessage && <span className="text-errorColor">{errorMessage}</span>}
    </div>
  );
};

export default FiledInput;
