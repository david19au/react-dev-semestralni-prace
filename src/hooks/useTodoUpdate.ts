import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi, ApiError, type TodoUpdatePayload } from "../api/todoApi";
import type { Todo } from "../types";

type UseTodoUpdateVariables = {
  id: number;
  payload: TodoUpdatePayload;
};

export const useTodoUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Todo,
    ApiError,
    UseTodoUpdateVariables,
    { previousTodo?: Todo }
  >({
    mutationFn: ({ id, payload }) => todoApi.updateTodo(id, payload),
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["todo", id] });
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodo = queryClient.getQueryData<Todo>(["todo", id]);

      // optimistic upd
      if (previousTodo) {
        queryClient.setQueryData<Todo>(["todo", id], {
          ...previousTodo,
          ...payload,
        });
      }

      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) =>
        oldTodos?.map((todo) =>
          todo.id === id ? { ...todo, ...payload } : todo
        )
      );

      return { previousTodo };
    },
    onError: (err, { id }, context) => {
      if (context?.previousTodo) {
        queryClient.setQueryData<Todo>(["todo", id], context.previousTodo);
      }
      console.error("Error updating todo:", err.message);
    },
    onSettled: (data, error, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["todo", id] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
