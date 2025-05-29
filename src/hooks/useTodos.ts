import { useState, useEffect } from 'react'
import { todoApi } from '../api/todoApi'
import type { Todo } from '../types'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch todo tasks:', error)
      setError('Failed to fetch todo tasks')
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async (todoName: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const newTodo = await todoApi.createTodo(todoName)
      setTodos((prevTodos) => {
        return [...prevTodos, newTodo]
      })
    } catch (error) {
      console.error(error)
      setError('Failed to add todo')
    } finally {
      setIsLoading(false)
    }
  }
  const deleteTodo = async (todoId: number) => {
    setIsLoading(true)
    setError(null)
    try {
      await todoApi.deleteTodo(todoId)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
    } catch (error) {
      console.error(error)
      setError('Failed to delete todo')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTodo = async (todoId: number, completed: boolean) => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedTodo = await todoApi.toggleTodo(todoId, !completed)
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === todoId ? updatedTodo : todo)))
    } catch (error) {
      console.error(error)
      setError('Failed to toggle todo')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return {
    error,
    todos,
    isLoading,
    addTodo,
    deleteTodo,
    toggleTodo,
    refetch: fetchTodos,
  }
}
