import React, { useRef, useState } from "react";

const Editor = ({ addTodo }) => {
  const [contents, setContents] = useState("");
  const contentsRef = useRef();

  const onChangeContents = (e) => {
    setContents(() => e.target.value);
  };

  const onAddTodo = () => {
    if (contents === "") {
      contentsRef.current.focus();
      return;
    }
    addTodo(contents);
    setContents(() => "");
  };

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      onAddTodo();
    }
  };

  return (
    <div>
      <input
        ref={contentsRef}
        placeholder={"할 일을 입력하세요."}
        value={contents}
        onChange={onChangeContents}
        onKeyDown={onKeyPress}
      ></input>
      <button onClick={onAddTodo}>추가</button>
    </div>
  );
};

export default Editor;
