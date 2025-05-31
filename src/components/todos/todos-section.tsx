import { useState, useMemo, type ChangeEvent } from "react";
import { TodoForm } from "./todo-form";
import { TodoItem } from "./todo-item";
import { Spinner } from "../spinner";
import { ErrorMessage } from "../error-message";
import { useTodosQuery } from "../../hooks/useTodosQuery";
import type { Todo } from "../../types";

export const TodosSection = () => {
  const { data: todos, error, isLoading, refetch } = useTodosQuery();
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    if (!filterText) return todos;

    return todos.filter((todo: Todo) =>
      todo.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [todos, filterText]);

  const isOriginalListEmpty = !todos || todos.length === 0;

  return (
    <main>
      {error && (
        <ErrorMessage message={error.message} onDismiss={() => refetch()} />
      )}
      <TodoForm />

      <div className="filter-input-group">
        <input
          type="text"
          placeholder="Filter todos by name..."
          value={filterText}
          onChange={handleFilterChange}
          aria-label="Filter todos by name"
          disabled={isLoading || (isOriginalListEmpty && !filterText)}
        />
      </div>

      <div className="todo-container">
        {isLoading && <Spinner />}

        {!isLoading && error && (
          <p className="empty-state-message">Could not load todos.</p>
        )}

        {!isLoading && !error && (
          <>
            {isOriginalListEmpty && !filterText && (
              <p className="empty-state-message">
                You have no todos yet. Add one above!
              </p>
            )}

            {!isOriginalListEmpty &&
              filteredTodos.length === 0 &&
              filterText && (
                <p className="empty-state-message">
                  No todos match your filter "{filterText}".
                </p>
              )}

            {filteredTodos.length > 0 && (
              <ul>
                {filteredTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  );
};
