import React from "react";

const List = ({ children }) => {
  return <div className="grid grid-cols-4 gap-4 py-8">{children}</div>;
};

export default List;
