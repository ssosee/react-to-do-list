import React from "react";

const TodoItem = ({ todo, deleteTodo, onUpdate }) => {
  const { id, contents, date, isDone } = todo;

  const onDeleteTodo = () => {
    deleteTodo(id);
  };

  const onCheck = () => {
    onUpdate(id);
  };

  return (
    <div>
      <input type={"checkbox"} checked={isDone} onChange={onCheck} />
      <div
        style={{
          textDecoration: isDone ? "line-through" : "none",
        }}
      >
        {contents}
      </div>
      <div>{new Date(date).toLocaleDateString()}</div>
      <button onClick={onDeleteTodo}>삭제</button>
    </div>
  );
};

export default TodoItem;
