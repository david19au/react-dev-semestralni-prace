import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'
import type { Todo } from '../types'

export const useTodoDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: async (id: number) => {
      return await todoApi.deleteTodo(id)
    },
    onMutate: (id) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return old?.filter((todo) => todo.id !== id)
      })
      return { previousTodos }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
