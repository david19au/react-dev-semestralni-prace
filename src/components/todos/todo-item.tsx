import { useNavigate } from "react-router";
import type { Todo } from "../../types";
import { useTodoDelete } from "../../hooks/useTodoDelete";
import { useTodoToggle } from "../../hooks/useTodoToggle";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: deleteTodo } = useTodoDelete();
  const { mutate: toggleTodo } = useTodoToggle();
  const navigate = useNavigate();

  const handleDeleteTodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTodo(todo.id);
  };

  const handleToggleTodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTodo({ id: todo.id, completed: !todo.completed });
  };

  const handleNavigateToDetail = () => {
    navigate(`/todos/${todo.id}`);
  };

  return (
    <li
      className={`${todo.completed ? "completed" : ""} todo-item-clickable`}
      onClick={handleNavigateToDetail}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleNavigateToDetail();
        }
      }}
    >
      <span className="todo-item-name">{todo.name}</span>{" "}
      <div className="todo-item-actions">
        <button
          onClick={handleDeleteTodo}
          aria-label={`Delete todo ${todo.name}`}
        >
          Delete
        </button>
        <button
          onClick={handleToggleTodo}
          className="toggle"
          aria-label={`${todo.completed ? "Mark" : "Mark"} ${todo.name} as ${
            todo.completed ? "not completed" : "completed"
          }`}
        >
          {todo.completed ? "Undo completion" : "Complete task"}
        </button>
      </div>
    </li>
  );
};
