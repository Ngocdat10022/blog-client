import React from "react";

const List = ({ children }) => {
  return (
    <div
      className={`grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 gap-4 py-8`}
    >
      {children}
    </div>
  );
};

export default List;
