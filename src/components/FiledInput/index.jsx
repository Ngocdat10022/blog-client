import React from "react";

const FiledInput = ({ lable, name, type, onChange }) => {
  return (
    <div className="flex flex-col w-full filed ">
      <span className="text-base ">{lable}</span>
      <input
        name={name}
        onChange={onChange}
        type={type}
        className="p-2 border-none rounded-md outline-none input bg-grayColor"
      />
    </div>
  );
};

export default FiledInput;
