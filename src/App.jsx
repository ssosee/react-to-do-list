import "./App.css";
import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Editor from "./components/Editor.jsx";
import "./index.css";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

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
    case "LOAD":
      return action.data;
    default:
      return state;
  }
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const todoIdRef = useRef(0);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      dispatch({ type: "LOAD", data: parsedTodos });
      // Update the ref to prevent ID collision
      todoIdRef.current = parsedTodos.length
        ? Math.max(...parsedTodos.map((todo) => todo.id)) + 1
        : 0;
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const createTodo = useCallback((contents) => {
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

  // onMount 일때만 실행
  const memoizeDispatch = useMemo(() => {
    return {
      createTodo,
      deleteTodo,
      completeTodo,
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <Header />
          <TodoStateContext.Provider value={todos}>
            <TodoDispatchContext.Provider value={memoizeDispatch}>
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
