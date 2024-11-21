import React from "react";

const Header = () => {
  return (
    <div>
      <h1>오늘의 할일!</h1>
      <h2>{new Date().toDateString()}</h2>
    </div>
  );
};

export default Header;
