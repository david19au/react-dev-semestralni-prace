import { Link } from 'react-router'
import { Header } from '../components/header'
import { useTodoQuery } from '../hooks/useTodoQuery'
import { useTodoUpdate } from '../hooks/useTodoUpdate'
import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import { Spinner } from '../components/spinner'

const TodoDetailPage = () => {
  const { data: todo, isLoading: isTodoLoading, isError, error: todoError } = useTodoQuery()
  const { mutate: updateTodo, isPending: isUpdating, isError: isUpdateError, error: updateError } = useTodoUpdate()

  const [description, setDescription] = useState('')
  const [currentName, setCurrentName] = useState('')

  useEffect(() => {
    if (todo) {
      setDescription(todo.description || '')
      setCurrentName(todo.name)
    }
  }, [todo])

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (todo) {
      updateTodo({
        id: todo.id,
        payload: {
          name: currentName,
          description: description,
        },
      })
    }
  }

  if (isTodoLoading) {
    return <Spinner />
  }

  if (isError || !todo) {
    return (
      <div className="todo-detail-error">
        <p>Could not load todo item. {todoError?.message}</p>
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <Header title="Todo Detail" subtitle="View or edit details of your todo" />
      <div className="todo-detail">
        <div className="todo-detail-card">
          <h2>{todo.name}</h2>
          <div className="todo-detail-status">
            Status:{' '}
            <span className={todo.completed ? 'completed' : 'active'}>{todo.completed ? 'Completed' : 'Active'}</span>
          </div>
          <div className="todo-detail-status">
            Priority: <span className={'completed'}>{todo.priority ?? 'Not set'}</span>
          </div>

          <form onSubmit={handleSubmit} className="todo-description-form">
            <label htmlFor="todo-description">Description:</label>
            <textarea
              id="todo-description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Add a description..."
              rows={4}
              disabled={isUpdating}
            />
            <button type="submit" disabled={isUpdating || description === (todo.description || '')}>
              {isUpdating ? 'Saving...' : 'Save Description'} {}
            </button>
            {isUpdateError && <p className="error-text">Failed to save: {updateError?.message}</p>}
          </form>
        </div>

        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    </>
  )
}

export default TodoDetailPage
