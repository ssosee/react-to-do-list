import "./App.css";
import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Editor from "./components/Editor.jsx";
import { useRef, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const id = useRef(0);

  const createTodo = (contents) => {
    return {
      id: id.current++,
      contents,
      date: new Date().getTime(),
      isDone: false,
    };
  };

  const addTodo = (contents) => {
    setTodos((prevTodos) => {
      return [...prevTodos, createTodo(contents)];
    });
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const onUpdate = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
    });
  };

  return (
    <div className={"App"}>
      <Header></Header>
      <Editor addTodo={addTodo}></Editor>
      <List todos={todos} deleteTodo={deleteTodo} onUpdate={onUpdate}></List>
    </div>
  );
}

export default App;
