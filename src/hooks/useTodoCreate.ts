import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, todoApi, type TodoCreatePayload } from "../api/todoApi";
import type { Todo } from "../types";

export const useTodoCreate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Todo,
    ApiError,
    TodoCreatePayload,
    { previousTodos?: Todo[] }
  >({
    mutationKey: ["createTodo"],
    mutationFn: (newTodoPayload: TodoCreatePayload) => {
      return todoApi.createTodo(newTodoPayload);
    },
    onMutate: async (newTodoPayload: TodoCreatePayload) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => [
        ...old,
        {
          id: Date.now(),
          name: newTodoPayload.name,
          description: newTodoPayload.description || "",
          priority: newTodoPayload.priority || 0,
          completed: false,
        },
      ]);
      return { previousTodos };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
