import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { todoApi } from "../api/todoApi";
import type { Todo } from "../types";

export const useTodoQuery = () => {
  const params = useParams();
  const todoId = Number(params.id);

  return useSuspenseQuery<Todo, Error>({
    queryKey: ["todo", todoId],
    queryFn: () => {
      if (!todoId || isNaN(todoId)) {
        return Promise.reject(new Error("Invalid Todo ID"));
      }
      return todoApi.fetchTodo(todoId);
    },
  });
};
