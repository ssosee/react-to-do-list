import React, { useRef } from "react";

const Editor = ({ createContents }) => {
  const [contents, setContent] = React.useState("");
  const contentsRef = useRef();

  const handleOnChange = (e) => {
    setContent((prevContents) => e.target.value);
  };

  const handleOnClick = () => {
    console.log(contents);
    if (contents === "") {
      contentsRef.current.focus();
      return;
    }
    createContents(contents);
    setContent((prevState) => "");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleOnClick(contents);
    }
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold mb-2">
        오늘 할일을 기록해볼까요? ✍️
      </h3>
      <div className="flex">
        <input
          ref={contentsRef}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="할일을 입력해주세요."
          value={contents}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded-r-md hover:bg-purple-600 transition duration-300 ease-in-out"
          onClick={handleOnClick}
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default Editor;
