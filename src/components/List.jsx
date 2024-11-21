import React, { useState } from "react";
import TodoItem from "./TodoItem.jsx";

const List = ({ todos, deleteTodo, onUpdate }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(() => e.target.value);
  };

  const getFilteredTodos = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.contents.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div>
      <input
        placeholder={"검색어를 입력하세요."}
        onChange={onChangeSearch}
        value={search}
      />
      {filteredTodos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  );
};

export default List;
