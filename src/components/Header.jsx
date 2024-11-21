import React from "react";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
      <h1 className="text-3xl font-bold mb-2">오늘의 할일</h1>
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

export default Header;
