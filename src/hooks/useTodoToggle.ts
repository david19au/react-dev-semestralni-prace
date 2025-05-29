import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo, TodoToggle } from '../types'

export const useTodoToggle = () => {
  const queryClient = useQueryClient()

  return useMutation<Todo, ApiError, TodoToggle>({
    mutationKey: ['toggleTodo'],
    mutationFn: async (todoToggle: TodoToggle) => {
      return await todoApi.toggleTodo(todoToggle)
    },
    onMutate: (todoToggle) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return old?.map((todo) => (todo.id === todoToggle.id ? { ...todo, completed: todoToggle.completed } : todo))
      })
      return { previousTodos }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
