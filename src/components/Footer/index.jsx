import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex items-start py-10">
      <div className="w-[40%] flex flex-col items-start gap-4">
        <h3 className="text-xl text-mainColor">Bài viết mới nhất</h3>
        <ul className="flex flex-col items-start gap-4">
          <li>
            <Link to="/">
              Hành trình gian nan  và may mắn để có thu nhập “cao” của mình như
              thế nào ?
            </Link>
          </li>
          <li>
            <Link to="/">
              Những đoạn code tùy biến cho VSCode cực đẹp bởi Evondev
            </Link>
          </li>
          <li>
            <Link to="/">
              Hướng dẫn tùy biến scrollbar cực đẹp dành cho người mới
            </Link>
          </li>
          <li>
            <Link to="/">
              3 cách làm Border Gradient trong CSS mà bạn nên biết
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl text-mainColor">Bạn bè</h3>
        <Link to="/">F8</Link>
      </div>
    </div>
  );
};

export default Footer;
