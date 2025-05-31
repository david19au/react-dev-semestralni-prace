import { Link, useNavigate } from "react-router";
import { Header } from "../components/header";
import { useTodoQuery } from "../hooks/useTodoQuery";
import { useTodoUpdate } from "../hooks/useTodoUpdate";
import { useTodoToggle } from "../hooks/useTodoToggle";
import { useTodoDelete } from "../hooks/useTodoDelete";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { Spinner } from "../components/spinner";

const TodoDetailPage = () => {
  const {
    data: todo,
    isLoading: isTodoLoading,
    isError,
    error: todoError,
  } = useTodoQuery();
  const navigate = useNavigate();

  const {
    mutate: updateTodo,
    isPending: isUpdatingDescription,
    isError: isUpdateError,
    error: updateError,
  } = useTodoUpdate();
  const { mutate: toggleTodoCompletion, isPending: isToggling } =
    useTodoToggle();
  const { mutate: deleteThisTodo, isPending: isDeleting } = useTodoDelete();

  const [description, setDescription] = useState("");
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    if (todo) {
      setDescription(todo.description || "");
      setCurrentName(todo.name);
    }
  }, [todo]);

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleDescriptionSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo) {
      updateTodo({
        id: todo.id,
        payload: {
          name: currentName,
          description: description,
        },
      });
    }
  };

  const handleToggleComplete = () => {
    if (todo) {
      toggleTodoCompletion(
        { id: todo.id, completed: !todo.completed },
        {
          onSuccess: (updatedTodoFromServer) => {
            console.log(
              "Toggle successful, data from server:",
              updatedTodoFromServer
            );
          },
          onError: (toggleError) => {
            console.error("Failed to toggle todo status:", toggleError.message);
          },
        }
      );
    }
  };

  const handleDelete = () => {
    if (todo) {
      if (window.confirm(`Are you sure you want to delete "${todo.name}"?`)) {
        deleteThisTodo(todo.id, {
          onSuccess: () => {
            navigate("/");
          },
          onError: (deleteErr) => {
            console.error("Failed to delete todo:", deleteErr);
            alert(`Failed to delete todo: ${deleteErr.message}`);
          },
        });
      }
    }
  };

  if (isTodoLoading) {
    return <Spinner />;
  }

  if (isError || !todo) {
    return (
      <div className="todo-detail-error">
        <p>Could not load todo item. {todoError?.message}</p>
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    );
  }

  const isActionInProgress = isUpdatingDescription || isToggling || isDeleting;

  return (
    <>
      <Header
        title="Todo Detail"
        subtitle="View or edit details of your todo"
      />
      <div className="todo-detail">
        <div className="todo-detail-card">
          <h2>{todo.name}</h2>
          <div className="todo-detail-status">
            Status:{" "}
            <span className={todo.completed ? "completed" : "active"}>
              {todo.completed ? "Completed" : "Active"}
            </span>
          </div>
          <div className="todo-detail-status">
            Priority:{" "}
            <span className={"completed"}>{todo.priority ?? "Not set"}</span>
          </div>
          <div className="todo-detail-actions">
            <button
              onClick={handleToggleComplete}
              disabled={isActionInProgress}
              className={`button-toggle ${
                todo.completed ? "button-undo" : "button-complete"
              }`}
            >
              {isToggling
                ? "Updating..."
                : todo.completed
                ? "Mark as Active"
                : "Mark as Completed"}
            </button>
            <button
              onClick={handleDelete}
              disabled={isActionInProgress}
              className="button-delete"
            >
              {isDeleting ? "Deleting..." : "Delete Task"}
            </button>
          </div>

          <form
            onSubmit={handleDescriptionSubmit}
            className="todo-description-form"
          >
            <label htmlFor="todo-description">Description:</label>
            <textarea
              id="todo-description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Add a description..."
              rows={4}
              disabled={isActionInProgress || isUpdatingDescription}
            />
            <button
              type="submit"
              disabled={
                isActionInProgress || description === (todo.description || "")
              }
            >
              {isUpdatingDescription ? "Saving..." : "Save Description"}
            </button>
            {isUpdateError && (
              <p className="error-text">
                Failed to save description: {updateError?.message}
              </p>
            )}
          </form>
        </div>

        <Link to="/">
          <button className="back-button" disabled={isActionInProgress}>
            Back to Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default TodoDetailPage;
