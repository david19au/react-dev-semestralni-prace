import type { ReactNode } from 'react'
import { TodosContext } from '../context/todos.context'
import { useTodos } from '../hooks/useTodos'

type Props = {
  children: ReactNode
}
export const TodosProvider = ({ children }: Props) => {
  const todosState = useTodos()

  return <TodosContext.Provider value={todosState}>{children}</TodosContext.Provider>
}
