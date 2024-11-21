import React from "react";
import TodoItem from "./TodoItem.jsx";

const List = ({ todos, deleteTodo, completeTodo }) => {
  const [search, setSearch] = React.useState("");

  const handleOnChange = (e) => {
    setSearch((prevSearch) => e.target.value);
  };

  const findTodos = () => {
    return todos.filter((todo) =>
      todo.contents.toLowerCase().includes(search.toLowerCase()),
    );
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">오늘의 할일 목록 👀</h3>
      <input
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="검색어를 입력하세요."
        onChange={handleOnChange}
        value={search}
      />
      <div className="space-y-2">
        {findTodos().map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
