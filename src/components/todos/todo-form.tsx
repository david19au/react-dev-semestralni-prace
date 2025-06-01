import { useState, type ChangeEvent, type FormEvent } from "react";
import { useTodoCreate } from "../../hooks/useTodoCreate";

export const TodoForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<number | "">("");

  const { mutate: createTodo, isPending: isCreating } = useTodoCreate();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriority(value === "" ? "" : parseInt(value, 10));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Task name cannot be empty.");
      return;
    }

    createTodo(
      {
        name: name.trim(),
        description: description.trim() || undefined,
        priority: priority === "" ? undefined : Number(priority),
      },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          setPriority("");
        },
      }
    );
  };

  const isAddButtonDisabled = isCreating || !name.trim();

  return (
    <form onSubmit={handleSubmit} className="todo-form-advanced">
      <div className="input-group main-input">
        <input
          value={name}
          onChange={handleNameChange}
          name="todo-name"
          placeholder="What needs to be done?"
          aria-label="Task name"
          disabled={isCreating}
        />
      </div>

      <div className="advanced-fields">
        <div className="form-field">
          <label htmlFor="todo-description">Description (Optional):</label>
          <textarea
            id="todo-description"
            value={description}
            onChange={handleDescriptionChange}
            name="todo-description"
            placeholder="Add more details..."
            rows={3}
            disabled={isCreating}
          />
        </div>

        <div className="form-field">
          <label htmlFor="todo-priority">Priority (Optional, 0-5):</label>
          <input
            id="todo-priority"
            type="number"
            value={priority}
            onChange={handlePriorityChange}
            name="todo-priority"
            placeholder="e.g., 0 (lowest)"
            min="0"
            max="5"
            disabled={isCreating}
          />
        </div>
      </div>

      <button
        type="submit"
        className="add-button"
        disabled={isAddButtonDisabled}
      >
        {isCreating ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};
