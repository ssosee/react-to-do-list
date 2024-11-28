import React, { memo, useContext } from "react";
import { TodoDispatchContext } from "../App.jsx";

const TodoItem = ({ todo }) => {
  const { deleteTodo, completeTodo } = useContext(TodoDispatchContext);
  const { id, contents, isCompleted, date } = todo;

  const handleOnClick = () => {
    deleteTodo(id);
  };

  const handleOnCheck = () => {
    completeTodo(id);
  };

  return (
    <div className="flex items-center p-3 bg-gray-50 rounded-md shadow-sm transition duration-300 ease-in-out hover:shadow-md">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleOnCheck}
        className="mr-3 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
      />
      <div className="flex-grow">
        <div className="text-sm text-gray-500">
          {new Date(date).toLocaleString("ko-KR")}
        </div>
        <div
          className={`text-lg ${
            isCompleted ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {contents}
        </div>
      </div>
      <button
        onClick={handleOnClick}
        className="ml-2 px-2 py-1 text-sm text-red-600 hover:bg-red-100 rounded transition duration-300 ease-in-out"
      >
        삭제
      </button>
    </div>
  );
};

// 고차 컴포넌트
export default memo(TodoItem);
