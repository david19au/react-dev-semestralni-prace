import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, todoApi } from "../api/todoApi";
import type { Todo } from "../types";

export const useTodoCreate = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, ApiError, string, { previousTodos?: Todo[] }>({
    mutationKey: ["createTodo"],
    mutationFn: (todoName: string) => {
      return todoApi.createTodo(todoName);
    },
    onMutate: async (todoName) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => [
        ...old,
        {
          name: todoName,
          id: Date.now(),
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
