import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  createContext,
} from "react";

import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Editor from "./components/Editor.jsx";

import "./App.css";
import "./index.css";

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [...state, action.data];
    case "DELETE":
      return state.filter((todo) => todo.id !== action.data);
    case "COMPLETE":
      return state.map((todo) =>
        todo.id === action.data
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo,
      );
    case "LOAD":
      return action.data;
    case "REORDER": {
      const newTodos = [...state];
      const [movedItem] = newTodos.splice(action.from, 1);
      newTodos.splice(action.to, 0, movedItem);
      return newTodos;
    }
    case "UPDATE": {
      return state.map((todo) =>
        todo.id === action.data.id
          ? { ...todo, contents: action.data.contents }
          : todo,
      );
    }
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const todoIdRef = useRef(0);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      dispatch({ type: "LOAD", data: parsedTodos });
      todoIdRef.current = parsedTodos.length
        ? Math.max(...parsedTodos.map((todo) => todo.id)) + 1
        : 0;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const createTodo = useCallback((contents) => {
    dispatch({
      type: "CREATE",
      data: {
        id: todoIdRef.current++,
        contents,
        isCompleted: false,
        date: new Date().getTime(),
      },
    });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: "DELETE", data: id });
  }, []);

  const completeTodo = useCallback((id) => {
    dispatch({ type: "COMPLETE", data: id });
  }, []);

  const reorderTodo = useCallback((fromIndex, toIndex) => {
    dispatch({ type: "REORDER", from: fromIndex, to: toIndex });
  }, []);

  const updateTodo = useCallback((id, contents) => {
    dispatch({ type: "UPDATE", data: { id, contents } });
  }, []);

  const clearTodos = useCallback(() => {
    dispatch({ type: "CLEAR" });
    localStorage.removeItem("todos");
  }, []);

  const dispatchMemo = useMemo(() => {
    return {
      createTodo,
      deleteTodo,
      completeTodo,
      reorderTodo,
      updateTodo,
      clearTodos,
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <Header />
          <TodoStateContext.Provider value={todos}>
            <TodoDispatchContext.Provider value={dispatchMemo}>
              <Editor />
              <List />
            </TodoDispatchContext.Provider>
          </TodoStateContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
