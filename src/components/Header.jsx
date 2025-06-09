import React, { memo } from "react";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-400 p-8 text-black-800 rounded-t-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2">힘들면 힘을 빼자 🔥</h1>
      <h2 className="text-xl opacity-75">
        {new Date().toLocaleDateString("ko-KR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h2>
    </div>
  );
};

export default memo(Header);
