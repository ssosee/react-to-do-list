import "./App.css";
import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Editor from "./components/Editor.jsx";
import "./index.css";

import { useRef, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const todoIdRef = useRef(0);

  const createContents = (contents) => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: todoIdRef.current++,
          contents: contents,
          isCompleted: false,
          date: new Date().getTime(),
        },
      ];
    });
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== id));
  };

  const completeTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) => {
        if (prevTodo.id === id) {
          return {
            ...prevTodo,
            isCompleted: !prevTodo.isCompleted,
          };
        }
        return prevTodo;
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <Header />
          <Editor createContents={createContents} />
          <List
            todos={todos}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
