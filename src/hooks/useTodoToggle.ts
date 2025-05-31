import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, todoApi } from "../api/todoApi";
import type { Todo, TodoToggle } from "../types";

interface ToggleTodoContext {
  previousTodo?: Todo;
  previousTodos?: Todo[];
}

export const useTodoToggle = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, ApiError, TodoToggle, ToggleTodoContext>({
    mutationFn: (todoToggle: TodoToggle) => todoApi.toggleTodo(todoToggle),
    onMutate: async (variables: TodoToggle) => {
      await queryClient.cancelQueries({ queryKey: ["todo", variables.id] });
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodo = queryClient.getQueryData<Todo>([
        "todo",
        variables.id,
      ]);
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      if (previousTodo) {
        queryClient.setQueryData<Todo>(["todo", variables.id], {
          ...previousTodo,
          completed: variables.completed,
        });
      }
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) =>
        oldTodos?.map((todo) =>
          todo.id === variables.id
            ? { ...todo, completed: variables.completed }
            : todo
        )
      );
      return { previousTodo, previousTodos };
    },
    onError: (err, variables, context) => {
      if (context?.previousTodo) {
        queryClient.setQueryData<Todo>(
          ["todo", variables.id],
          context.previousTodo
        );
      }
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
      }
      console.error("Error toggling todo:", err.message);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["todo", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
