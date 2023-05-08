import React from "react";

const Heading = ({ name }) => {
  return (
    <h3 className="mt-5 mb-5 text-[40px] font-bold text-blackColor" id="post">
      {name}
    </h3>
  );
};

export default Heading;
