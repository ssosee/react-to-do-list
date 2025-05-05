import React, { useContext, useMemo } from "react";
import TodoItem from "./TodoItem.jsx";
import { TodoStateContext, TodoDispatchContext } from "../App.jsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const List = () => {
  const todos = useContext(TodoStateContext);
  const { reorderTodo } = useContext(TodoDispatchContext);
  const [search, setSearch] = React.useState("");

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.contents.toLowerCase().includes(search.toLowerCase()),
    );
  }, [todos, search]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    reorderTodo(sourceIndex, destinationIndex);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">힘을 빼야할 목록 👀</h3>
      <input
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        placeholder="검색어를 입력하세요."
        onChange={handleOnChange}
        value={search}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todoList">
          {(provided) => (
            <div
              className="space-y-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTodos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={`${todo.id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem todo={todo} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default List;
