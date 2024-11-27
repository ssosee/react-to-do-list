import "./App.css";
import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Editor from "./components/Editor.jsx";
import "./index.css";

import { useCallback, useReducer, useRef } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [...state, action.data];
    case "DELETE":
      return state.filter((todo) => todo.id !== action.data);
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.data) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const todoIdRef = useRef(0);

  const createContents = useCallback((contents) => {
    dispatch({
      type: "CREATE",
      data: {
        id: todoIdRef.current++,
        contents: contents,
        isCompleted: false,
        date: new Date().getTime(),
      },
    });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({
      type: "DELETE",
      data: id,
    });
  }, []);

  const completeTodo = useCallback((id) => {
    dispatch({
      type: "COMPLETE",
      data: id,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center p-4">
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
