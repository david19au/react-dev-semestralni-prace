# React Basics

This guide provides a comprehensive introduction to React, covering its core concepts, how it works under the hood, and essential APIs you'll use in everyday development.

## Table of Contents

- [What is React?](#what-is-react)
- [How React Works](#how-react-works)
  - [Virtual DOM](#virtual-dom)
  - [Reconciliation](#reconciliation)
  - [Component Lifecycle](#component-lifecycle)
- [JSX Syntax](#jsx-syntax)
- [Components](#components)
- [Props](#props)
- [State](#state)
- [React Hooks](#react-hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)
  - [useContext](#usecontext)
  - [useReducer](#usereducer)
  - [useRef](#useref)
  - [useMemo and useCallback](#usememo-and-usecallback)
  - [Custom Hooks](#custom-hooks)
- [State Management Comparison](#state-management-comparison)
- [React Router](#react-router)
- [Styling in React](#styling-in-react)
- [Testing React Applications](#testing-react-applications)
- [Performance Optimization](#performance-optimization)

## What is React?

React is a JavaScript library for building user interfaces, particularly single-page applications. It was created by Facebook and is maintained by Facebook and a community of individual developers and companies.

Key characteristics:

- **Component-Based**: Build encapsulated components that manage their own state, then compose them to make complex UIs.
- **Declarative**: Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
- **Learn Once, Write Anywhere**: Develop new features in React without rewriting existing code. React can also render on the server using Node and power mobile apps using React Native.

## How React Works

### Virtual DOM

One of React's most powerful features is the Virtual DOM, which is a lightweight representation of the actual DOM. Here's how it works:

1. **Creation**: When your React application renders, it creates a virtual representation of the entire UI in memory.

2. **Update**: When state or props change, React creates a new virtual DOM tree.

3. **Diffing**: React then compares the new virtual DOM with the previous one using a process called "reconciliation" to identify what has changed.

4. **Minimal Update**: Once React knows exactly what changed, it updates only those specific parts of the actual DOM, minimizing browser operations and improving performance.

```javascript
// This JSX:
const element = <h1>Hello, world!</h1>

// Is transformed to this JavaScript:
const element = React.createElement('h1', null, 'Hello, world!')

// Which creates a Virtual DOM object like:
const virtualDOM = {
  type: 'h1',
  props: {
    children: 'Hello, world!',
  },
}
```

### Reconciliation

Reconciliation is the algorithm React uses to determine what needs to be updated in the UI. The key principles are:

1. **Different component types**: If a component changes from one type to another (e.g., from `<Button>` to `<Div>`), React will unmount the old one and mount the new one.

2. **Same component type**: If it's the same component type, React will keep the same DOM node and only update the changed props.

3. **Keys**: When rendering lists, React uses "keys" to identify which items have changed, been added, or been removed. Keys should be stable, predictable, and unique.

```javascript
// Without keys, React might re-render all items
const todoItems = todos.map((todo) => <li>{todo.text}</li>)

// With keys, React can be more efficient
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>)
```

### Component Lifecycle

In modern React with hooks, components go through these general phases:

1. **Mounting**: Component is created and inserted into the DOM

   - `useState` initializes with default values
   - `useEffect` with no dependencies runs

2. **Updating**: Component re-renders due to state or prop changes

   - State updates trigger re-renders
   - `useEffect` with dependencies runs when those dependencies change

3. **Unmounting**: Component is removed from the DOM
   - Cleanup functions in `useEffect` are called

## JSX Syntax

JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML but is actually transformed into JavaScript function calls.

```jsx
// This JSX
const element = (
  <div className="container">
    <h1>Hello, {name}!</h1>
    <p>Welcome to React</p>
  </div>
)

// Is transformed to this JavaScript
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Hello, ', name, '!'),
  React.createElement('p', null, 'Welcome to React'),
)
```

Key JSX features:

- **JavaScript Expressions**: You can embed any JavaScript expression in JSX by wrapping it in curly braces `{}`.
- **Attributes**: JSX uses camelCase property naming convention (e.g., `className` instead of `class`).
- **Children**: JSX elements can have children, just like in HTML.
- **Self-closing Tags**: Elements without children can be self-closing (e.g., `<img src="..." />`).
- **Fragments**: `<React.Fragment>` or the shorthand `<>...</>` let you group elements without adding extra nodes to the DOM.

```jsx
function Greeting({ user, notifications }) {
  return (
    <>
      <h1 className={user.isVIP ? 'vip-heading' : 'normal-heading'}>Hello, {user.name}!</h1>
      {notifications.length > 0 && <p>You have {notifications.length} new messages.</p>}
    </>
  )
}
```

## Components

Components are the building blocks of React applications. There are two types:

### Functional Components

Modern React primarily uses functional components with hooks:

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

### Class Components

Older React code often uses class components:

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

Components can be composed to create more complex UIs:

```jsx
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  )
}
```

## Props

Props (short for "properties") are read-only inputs to components. They allow you to pass data from a parent component to a child component:

```jsx
// Parent component passing props
function App() {
  return <UserProfile name="John" age={25} isAdmin={true} />
}

// Child component receiving props
function UserProfile(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Age: {props.age}</p>
      {props.isAdmin && <span>Administrator</span>}
    </div>
  )
}

// Using destructuring for cleaner code
function UserProfile({ name, age, isAdmin }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      {isAdmin && <span>Administrator</span>}
    </div>
  )
}
```

## State

State is a way to store and manage component-specific data that can change over time. When state changes, React re-renders the component.

```jsx
import { useState } from 'react'

function Counter() {
  // Initialize state with useState hook
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

State updates in React are:

- **Asynchronous**: React may batch multiple state updates for performance.
- **Immutable**: You should never directly modify state (`count = count + 1` is wrong).
- **Merged**: When using class components, setState() merges the object you provide into the current state.

For complex state updates, you can use a function form:

```jsx
// Function form ensures you're working with the latest state
setCount((prevCount) => prevCount + 1)
```

## React Hooks

Hooks are functions that let you "hook into" React state and lifecycle features from functional components.

### useState

The `useState` hook lets you add state to functional components:

```jsx
import { useState } from 'react'

function Form() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, email })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### useEffect

The `useEffect` hook lets you perform side effects in functional components:

```jsx
import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This runs after render and when userId changes
    async function fetchUser() {
      setLoading(true)
      try {
        const response = await fetch(`/api/users/${userId}`)
        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    // Cleanup function runs before the next effect or unmount
    return () => {
      // Cancel any pending requests or subscriptions
    }
  }, [userId]) // Dependency array - effect runs when these values change

  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

useEffect dependency patterns:

- `useEffect(() => {}, [])` - Runs once after initial render (like componentDidMount)
- `useEffect(() => {}, [id, name])` - Runs when id or name changes
- `useEffect(() => {})` - Runs on every render (rarely needed)

### useContext

The `useContext` hook lets you subscribe to React context without introducing nesting:

```jsx
import { createContext, useContext, useState } from 'react'

// Create a context
const ThemeContext = createContext('light')

// Provider component
function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Header />
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
      </div>
    </ThemeContext.Provider>
  )
}

// Consumer component using useContext
function Header() {
  const theme = useContext(ThemeContext)

  return (
    <header className={`header-${theme}`}>
      <h1>My App</h1>
    </header>
  )
}
```

### useReducer

The `useReducer` hook is an alternative to `useState` for complex state logic:

```jsx
import { useReducer } from 'react'

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    case 'SET':
      return { count: action.payload }
    default:
      throw new Error(`Unsupported action type: ${action.type}`)
  }
}

function Counter() {
  // Initialize with useReducer(reducer, initialState)
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'SET', payload: 10 })}>Set to 10</button>
    </div>
  )
}
```

### useRef

The `useRef` hook creates a mutable reference that persists across renders:

```jsx
import { useRef, useEffect } from 'react'

function AutoFocusInput() {
  // Create a ref
  const inputRef = useRef(null)

  // Focus the input after initial render
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return <input ref={inputRef} />
}
```

useRef has two main use cases:

1. Accessing DOM elements directly
2. Keeping mutable values without causing re-renders

```jsx
function Timer() {
  const intervalRef = useRef(null)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [])

  const handleStop = () => {
    clearInterval(intervalRef.current)
  }

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={handleStop}>Stop</button>
    </div>
  )
}
```

### useMemo and useCallback

These hooks help optimize performance by memoizing values and functions.

#### useMemo

The `useMemo` hook memoizes a computed value, only recalculating it when dependencies change:

```jsx
import { useMemo, useState } from 'react'

function ExpensiveCalculation({ numbers }) {
  const [filter, setFilter] = useState('')

  // This calculation only runs when numbers or filter changes
  const filteredAndSortedNumbers = useMemo(() => {
    console.log('Computing expensive filtered list...')

    // Expensive operation
    return numbers.filter((n) => n.toString().includes(filter)).sort((a, b) => a - b)
  }, [numbers, filter])

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter numbers" />
      <ul>
        {filteredAndSortedNumbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  )
}
```

Use `useMemo` when:

- You have expensive calculations that don't need to be re-computed on every render
- You need to maintain reference equality for objects or arrays to prevent unnecessary re-renders

#### useCallback

The `useCallback` hook returns a memoized version of a callback function that only changes if one of the dependencies has changed:

```jsx
import { useCallback, useState } from 'react'

function TodoApp() {
  const [todos, setTodos] = useState([])

  // This function reference remains stable between renders
  const addTodo = useCallback((text) => {
    const newTodo = { id: Date.now(), text }
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }, []) // Empty dependencies means function never re-creates

  // With dependencies
  const removeTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }, [])

  return (
    <div>
      <TodoInput onAddTodo={addTodo} />
      <TodoList todos={todos} onRemoveTodo={removeTodo} />
    </div>
  )
}

// Child component that uses React.memo to prevent unnecessary re-renders
const TodoInput = React.memo(({ onAddTodo }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddTodo(text)
    setText('')
  }

  console.log('TodoInput rendered')

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  )
})
```

Use `useCallback` when:

- Passing callback functions to optimized child components that rely on reference equality to prevent unnecessary renders
- Functions are used as dependencies for other hooks like `useEffect`

### Custom Hooks

Custom hooks allow you to extract component logic into reusable functions. They follow the naming convention `useXxx` and can call other hooks.

```jsx
// Creating a custom hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

// Using the custom hook
function UserSettings() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)

  return (
    <div>
      <h1>User Settings</h1>
      <label>
        <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
        Dark Mode
      </label>
    </div>
  )
}
```

Another example - a custom hook for fetching data:

```jsx
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    setLoading(true)

    fetch(url, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        if (!signal.aborted) {
          setData(data)
          setError(null)
        }
      })
      .catch((error) => {
        if (!signal.aborted) {
          setError(error)
          setData(null)
        }
      })
      .finally(() => {
        if (!signal.aborted) {
          setLoading(false)
        }
      })

    return () => {
      abortController.abort()
    }
  }, [url])

  return { data, loading, error }
}

// Using the useFetch hook
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!user) return <div>User not found</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

## State Management Comparison

React offers several approaches to state management, each with its own use cases.

### useState vs useReducer

| Feature        | useState                             | useReducer                             |
| -------------- | ------------------------------------ | -------------------------------------- |
| Complexity     | Simple state                         | Complex state & logic                  |
| Boilerplate    | Minimal                              | More (actions, reducer)                |
| Predictability | Less predictable for complex updates | More predictable with explicit actions |
| Related State  | Separate (multiple useState calls)   | Grouped (single state object)          |
| Debugging      | Harder to track state changes        | Easier with action history             |
| Performance    | Re-renders on every state change     | Can optimize with action batching      |

When to use each:

**Use useState when:**

- State is simple (primitive values, simple objects)
- Few state transitions
- No need for shared state logic between components
- State changes are straightforward

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

**Use useReducer when:**

- Complex state with multiple sub-values
- Related state transitions
- Complex business logic
- Need for predictable state updates
- Testing state changes in isolation

```jsx
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      }
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find((item) => item.id === action.payload)
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - (itemToRemove ? itemToRemove.price : 0),
      }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      }
    default:
      return state
  }
}

function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  return (
    <div>
      <h2>Shopping Cart (${cart.total.toFixed(2)})</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
            <button
              onClick={() =>
                dispatch({
                  type: 'REMOVE_ITEM',
                  payload: item.id,
                })
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
    </div>
  )
}
```

### Context + useReducer: App-wide State Management

For larger applications, combining Context with useReducer can create a Redux-like state management system:

```jsx
// Create a context
const TodoContext = createContext()

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }]
    case 'TOGGLE_TODO':
      return state.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo))
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload)
    default:
      return state
  }
}

// Provider component
function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, [])

  return <TodoContext.Provider value={{ todos, dispatch }}>{children}</TodoContext.Provider>
}

// Hook for consuming the context
function useTodos() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  return context
}

// Usage in components
function App() {
  return (
    <TodoProvider>
      <TodoForm />
      <TodoList />
    </TodoProvider>
  )
}

function TodoForm() {
  const { dispatch } = useTodos()
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text })
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add todo" />
      <button type="submit">Add</button>
    </form>
  )
}

function TodoList() {
  const { todos, dispatch } = useTodos()

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          <span
            onClick={() =>
              dispatch({
                type: 'TOGGLE_TODO',
                payload: todo.id,
              })
            }
          >
            {todo.text}
          </span>
          <button
            onClick={() =>
              dispatch({
                type: 'DELETE_TODO',
                payload: todo.id,
              })
            }
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
```

## React Router

React Router is the standard routing library for React applications. It enables navigation between views in your application, allowing you to build single-page applications with multiple routes.

### Installation

```bash
npm install react-router-dom
```

### Basic Routing

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Home() {
  return <h2>Home Page</h2>
}

function About() {
  return <h2>About Page</h2>
}

function Users() {
  return <h2>Users Page</h2>
}
```

### URL Parameters

```jsx
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Users() {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        <li>
          <Link to="/users/1">User 1</Link>
        </li>
        <li>
          <Link to="/users/2">User 2</Link>
        </li>
      </ul>
    </div>
  )
}

function UserDetail() {
  // Access the dynamic URL parameter
  const { userId } = useParams()

  return (
    <div>
      <h2>User Detail</h2>
      <p>User ID: {userId}</p>
    </div>
  )
}
```

### Nested Routes

```jsx
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="users" element={<Users />}>
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<UserDetail />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      {/* Outlet renders the current child route */}
      <Outlet />
    </div>
  )
}

function Users() {
  return (
    <div>
      <h2>Users</h2>
      <Outlet />
    </div>
  )
}
```

### Programmatic Navigation

```jsx
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Login logic here
      const success = await loginUser(username, password)

      if (success) {
        // Redirect after successful login
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  )
}
```

### Query Parameters

```jsx
import { useSearchParams } from 'react-router-dom'

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])

  // Get query parameters
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || 'name'

  // Update filters
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value
    setSearchParams({ category: newCategory, sort })
  }

  const handleSortChange = (e) => {
    const newSort = e.target.value
    setSearchParams({ category, sort: newSort })
  }

  // Fetch products based on filters
  useEffect(() => {
    fetchProducts(category, sort).then((data) => {
      setProducts(data)
    })
  }, [category, sort])

  return (
    <div>
      <div>
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
          </select>
        </label>

        <label>
          Sort by:
          <select value={sort} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Protected Routes

```jsx
import { Navigate, useLocation } from 'react-router-dom'

// Auth context for managing authentication state
const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = async (username, password) => {
    // Login logic
    const user = await loginApi(username, password)
    setUser(user)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

function useAuth() {
  return useContext(AuthContext)
}

// Protected route component
function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    // Redirect to login but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

// In your router
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="public" element={<PublicPage />} />
            <Route
              path="dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
```

## Styling in React

React offers multiple approaches to styling components. Here are the most common methods:

### 1. CSS Stylesheets

The traditional approach using regular CSS files.

```css
/* styles.css */
.button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.button:hover {
  background-color: #45a049;
}
```

```jsx
// Import the CSS file
import './styles.css'

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}
```

**Pros:**

- Familiar to most developers
- Clear separation of concerns
- Can use existing CSS knowledge

**Cons:**

- Global namespace can lead to conflicts
- No direct connection between component and styles
- More difficult to implement dynamic styling

### 2. Inline Styles

Styles are applied directly to elements using the `style` attribute.

```jsx
function Button({ children, onClick, primary }) {
  const buttonStyle = {
    backgroundColor: primary ? '#4CAF50' : '#f8f9fa',
    color: primary ? 'white' : 'black',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  }

  return (
    <button style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  )
}
```

**Pros:**

- Styles are directly coupled to the component
- Easy to implement dynamic styling based on props or state
- No CSS conflicts

**Cons:**

- No support for CSS features like media queries, pseudo-selectors, etc.
- Can make JSX harder to read with complex styles
- No style reuse across components

### 3. CSS Modules

CSS files that are locally scoped to a component.

```css
/* Button.module.css */
.button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.button:hover {
  background-color: #45a049;
}

.secondary {
  background-color: #f8f9fa;
  color: #212529;
  border: 1px solid #dee2e6;
}
```

```jsx
// Import as a module
import styles from './Button.module.css'

function Button({ children, onClick, secondary }) {
  return (
    <button className={`${styles.button} ${secondary ? styles.secondary : ''}`} onClick={onClick}>
      {children}
    </button>
  )
}
```

**Pros:**

- Local scope prevents style conflicts
- Full CSS feature support
- Can still separate styles from components
- Build-time optimization

**Cons:**

- Requires build configuration (though included in Create React App)
- Slightly more complex than traditional CSS
- Dynamic styling is more verbose

### 4. CSS-in-JS Libraries (Styled Components)

Using JavaScript to define CSS styles.

```jsx
import styled from 'styled-components'

// Create a styled component
const StyledButton = styled.button`
  background-color: ${(props) => (props.primary ? '#4CAF50' : '#f8f9fa')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => (props.primary ? '#45a049' : '#e2e6ea')};
  }

  ${(props) =>
    props.large &&
    `
    font-size: 18px;
    padding: 12px 24px;
  `}
`

function Button({ children, onClick, primary, large }) {
  return (
    <StyledButton onClick={onClick} primary={primary} large={large}>
      {children}
    </StyledButton>
  )
}
```

**Pros:**

- Component-scoped styles
- Full access to props for dynamic styling
- Support for all CSS features including nesting, media queries
- No separate CSS files needed

**Cons:**

- Additional library dependency
- Runtime cost (though minimal with modern libraries)
- Steeper learning curve
- Can mix concerns of styling and behavior

### 5. Utility-First CSS (Tailwind CSS)

Using pre-defined utility classes to style components.

```jsx
// Requires Tailwind CSS setup
function Button({ children, onClick, primary }) {
  const baseClasses = 'px-4 py-2 rounded font-semibold focus:outline-none'
  const colorClasses = primary
    ? 'bg-green-500 hover:bg-green-600 text-white'
    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'

  return (
    <button className={`${baseClasses} ${colorClasses}`} onClick={onClick}>
      {children}
    </button>
  )
}
```

**Pros:**

- Rapid development
- Consistent design system
- No need to create and name custom CSS classes
- Highly composable

**Cons:**

- HTML can become verbose with many utility classes
- Requires learning utility class names
- May need configuration for custom design systems

### Choosing a Styling Approach

| Approach        | Best For                                                    | When to Avoid                                           |
| --------------- | ----------------------------------------------------------- | ------------------------------------------------------- |
| CSS Stylesheets | Simple applications, teams with CSS specialists             | Large apps where name conflicts could occur             |
| Inline Styles   | Highly dynamic styles, quick prototypes                     | Complex styling needs with pseudoselectors, animations  |
| CSS Modules     | Most React applications, balance of separation and locality | Very simple applications where setup is overhead        |
| CSS-in-JS       | Complex, highly dynamic UIs                                 | Performance-critical applications, simple styling needs |
| Utility-First   | Rapid development, consistent design                        | Projects where design uniqueness is critical            |

Most modern React applications use a combination of CSS Modules or CSS-in-JS libraries, depending on team preferences and project requirements.

## Testing React Applications

Testing is a critical part of developing reliable React applications. Here are the main approaches to testing React apps:

### Types of Tests

1. **Unit Tests**: Test individual components or functions in isolation
2. **Integration Tests**: Test how multiple components work together
3. **End-to-End Tests**: Test complete user flows in a real browser environment

### Testing Libraries

The most common testing libraries for React applications:

- **Jest**: A JavaScript test runner that lets you write tests with an approachable, familiar and feature-rich API.
- **React Testing Library**: A set of helpers that let you test React components without relying on their implementation details.
- **Cypress**: End-to-end testing framework that allows you to write tests that run in a real browser.

### Setting Up Testing

Create React App comes with Jest and React Testing Library pre-configured.

For a custom setup, install the necessary dependencies:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Unit Testing Components

```jsx
// Button.js
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

export default Button
```

```jsx
// Button.test.js
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

// Test suite
describe('Button', () => {
  // Test case
  test('renders button with correct text', () => {
    // Arrange
    render(<Button>Click me</Button>)

    // Act - none needed for this test

    // Assert
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('calls onClick prop when clicked', () => {
    // Arrange
    const handleClick = jest.fn() // Mock function
    render(<Button onClick={handleClick}>Click me</Button>)

    // Act
    fireEvent.click(screen.getByText('Click me'))

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Testing Hooks

```jsx
// useCounter.js
import { useState } from 'react'

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const increment = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const decrement = () => {
    setCount((prevCount) => prevCount - 1)
  }

  const reset = () => {
    setCount(initialValue)
  }

  return { count, increment, decrement, reset }
}

export default useCounter
```

```jsx
// useCounter.test.js
import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from './useCounter'

describe('useCounter', () => {
  test('should initialize with default value', () => {
    // Render the hook
    const { result } = renderHook(() => useCounter())

    // Assert initial state
    expect(result.current.count).toBe(0)
  })

  test('should initialize with provided value', () => {
    const { result } = renderHook(() => useCounter(10))
    expect(result.current.count).toBe(10)
  })

  test('should increment counter', () => {
    const { result } = renderHook(() => useCounter())

    // Act - wrap in act to ensure state updates are processed
    act(() => {
      result.current.increment()
    })

    // Assert
    expect(result.current.count).toBe(1)
  })

  test('should decrement counter', () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current.decrement()
    })

    expect(result.current.count).toBe(4)
  })

  test('should reset counter', () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current.increment()
      result.current.reset()
    })

    expect(result.current.count).toBe(5)
  })
})
```

### Testing Async Operations

```jsx
// UserProfile.js
import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        const response = await fetch(`/api/users/${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }
        const data = await response.json()
        setUser(data)
        setError(null)
      } catch (err) {
        setError(err.message)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>No user found</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}

export default UserProfile
```

```jsx
// UserProfile.test.js
import { render, screen, waitFor } from '@testing-library/react'
import UserProfile from './UserProfile'

// Mock the fetch API
global.fetch = jest.fn()

describe('UserProfile', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  test('displays loading state initially', () => {
    // Mock fetch to return a promise that never resolves
    global.fetch.mockImplementation(() => new Promise(() => {}))

    render(<UserProfile userId="1" />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('displays user data when fetch succeeds', async () => {
    // Mock successful fetch
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: 'John Doe', email: 'john@example.com' }),
      }),
    )

    render(<UserProfile userId="1" />)

    // Wait for the user data to be displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalledWith('/api/users/1')
  })

  test('displays error when fetch fails', async () => {
    // Mock failed fetch
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: false,
      }),
    )

    render(<UserProfile userId="1" />)

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch user')).toBeInTheDocument()
    })
  })
})
```

### Integration Testing

```jsx
// TodoApp.js
function TodoApp() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo"
          data-testid="todo-input"
        />
        <button onClick={addTodo} data-testid="add-button">
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(todo.id)}
            data-testid={`todo-item-${todo.id}`}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

```jsx
// TodoApp.test.js
import { render, screen, fireEvent } from '@testing-library/react'
import TodoApp from './TodoApp'

describe('TodoApp', () => {
  test('adds a new todo when the add button is clicked', () => {
    render(<TodoApp />)

    // Add a todo
    fireEvent.change(screen.getByTestId('todo-input'), {
      target: { value: 'Buy groceries' },
    })
    fireEvent.click(screen.getByTestId('add-button'))

    // Check if todo is added to the list
    expect(screen.getByText('Buy groceries')).toBeInTheDocument()

    // Input should be cleared
    expect(screen.getByTestId('todo-input').value).toBe('')
  })

  test('toggles todo completion status when clicked', () => {
    render(<TodoApp />)

    // Add a todo
    fireEvent.change(screen.getByTestId('todo-input'), {
      target: { value: 'Buy groceries' },
    })
    fireEvent.click(screen.getByTestId('add-button'))

    // Get the todo item
    const todoItem = screen.getByText('Buy groceries')

    // Initially not completed
    expect(todoItem).toHaveStyle({ textDecoration: 'none' })

    // Click to toggle completion
    fireEvent.click(todoItem)

    // Should be marked as completed
    expect(todoItem).toHaveStyle({ textDecoration: 'line-through' })

    // Click again to toggle back
    fireEvent.click(todoItem)

    // Should be marked as not completed
    expect(todoItem).toHaveStyle({ textDecoration: 'none' })
  })
})
```

### Testing Best Practices

1. **Test behavior, not implementation**: Focus on what the component does, not how it does it.

2. **Use data-testid for test-specific selectors**: Avoid using class names or CSS selectors that might change with styling updates.

3. **Mock external dependencies**: When testing components that use external services, mock those services to isolate your tests.

4. **Test edge cases**: Test not only the happy path but also error states, empty states, and boundary conditions.

5. **Keep tests simple and focused**: Each test should verify one specific behavior.

6. **Use setup functions for repetitive code**: Extract common setup logic into helper functions.

7. **Run tests in isolation**: Tests should not depend on the order of execution or shared state.

8. **Test accessibility**: Ensure your components are accessible by testing keyboard navigation and screen reader compatibility.

## Performance Optimization

As React applications grow, performance optimization becomes increasingly important. Here are key techniques to optimize React performance:

### 1. React.memo for Component Memoization

Use `React.memo` to prevent unnecessary re-renders of functional components:

```jsx
import { memo } from 'react'

// Before: Component re-renders on every parent render
function MovieCard({ title, releaseDate, poster }) {
  console.log(`Rendering: ${title}`)
  return (
    <div className="movie-card">
      <img src={poster} alt={title} />
      <h3>{title}</h3>
      <p>{releaseDate}</p>
    </div>
  )
}

// After: Component only re-renders if props change
const MemoizedMovieCard = memo(function MovieCard({ title, releaseDate, poster }) {
  console.log(`Rendering: ${title}`)
  return (
    <div className="movie-card">
      <img src={poster} alt={title} />
      <h3>{title}</h3>
      <p>{releaseDate}</p>
    </div>
  )
})

// Optionally, provide a custom comparison function
const MemoizedMovieCard = memo(MovieCard, (prevProps, nextProps) => {
  return prevProps.title === nextProps.title && prevProps.releaseDate === nextProps.releaseDate
  // We're ignoring poster changes for this example
})
```

### 2. Virtualization for Long Lists

Render only the visible portion of long lists using a library like `react-window` or `react-virtualized`:

```jsx
import { FixedSizeList } from 'react-window'

function VirtualizedList({ items }) {
  // Render a row in the list
  const Row = ({ index, style }) => (
    <div style={style} className="list-item">
      {items[index].name}
    </div>
  )

  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={items.length}
      itemSize={50} // height of each row
    >
      {Row}
    </FixedSizeList>
  )
}
```

### 3. Code Splitting with React.lazy and Suspense

Split your code into smaller chunks that load on demand:

```jsx
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// Instead of importing directly
// import Dashboard from './Dashboard';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'))
const Profile = lazy(() => import('./Profile'))
const Settings = lazy(() => import('./Settings'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}
```

### 4. Optimizing Context Usage

Avoid wrapping your entire app in context providers if not necessary:

```jsx
// Instead of this (causes all components to re-render)
function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="app">
        <Header />
        <Sidebar />
        <MainContent />
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

// Split contexts and provide them only where needed
function App() {
  return (
    <div className="app">
      <UserProvider>
        <Header />
        <ThemeProvider>
          <Sidebar />
          <MainContent />
        </ThemeProvider>
        <Footer />
      </UserProvider>
    </div>
  )
}
```

### 5. Use Web Workers for CPU-Intensive Tasks

Move CPU-intensive operations off the main thread:

```jsx
// worker.js
self.addEventListener('message', (e) => {
  const { data, operation } = e.data

  if (operation === 'process') {
    // Perform expensive data processing
    const result = performExpensiveOperation(data)
    self.postMessage(result)
  }
})

// Component.js
function DataProcessor() {
  const [result, setResult] = useState(null)
  const [processing, setProcessing] = useState(false)
  const workerRef = useRef(null)

  useEffect(() => {
    // Create worker
    workerRef.current = new Worker('./worker.js')

    // Set up message handler
    workerRef.current.addEventListener('message', (e) => {
      setResult(e.data)
      setProcessing(false)
    })

    return () => {
      workerRef.current.terminate()
    }
  }, [])

  const processData = (data) => {
    setProcessing(true)
    workerRef.current.postMessage({ data, operation: 'process' })
  }

  return (
    <div>
      <button onClick={() => processData(largeDataSet)} disabled={processing}>
        {processing ? 'Processing...' : 'Process Data'}
      </button>
      {result && <div>Result: {result}</div>}
    </div>
  )
}
```

### 6. Debouncing and Throttling Event Handlers

Limit how often functions are called for events like scrolling, resizing, or input changes:

```jsx
import { useState, useCallback } from 'react'
import debounce from 'lodash/debounce'

function SearchInput({ onSearch }) {
  const [value, setValue] = useState('')

  // Using useCallback to maintain the same function reference between renders
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      onSearch(searchTerm)
    }, 500),
    [onSearch],
  )

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    debouncedSearch(newValue)
  }

  return <input type="text" value={value} onChange={handleChange} placeholder="Search..." />
}
```

### 7. Use Fragment to Avoid Unnecessary DOM Nodes

Avoid adding extra div elements to the DOM:

```jsx
// Instead of this
function List({ items }) {
  return (
    <div>
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  )
}

// Use Fragment
function List({ items }) {
  return (
    <>
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </>
  )
}
```

### 8. Use Production Builds

Always use production builds for deployment, which removes development-specific code:

```bash
# For Create React App
npm run build

# For custom setups, set NODE_ENV=production
```

### 9. Measuring Performance

Use the React DevTools Profiler to identify performance issues:

1. Install React DevTools browser extension
2. Open the Profiler tab
3. Click the record button and interact with your application
4. Analyze component render times and the reasons for renders

```jsx
// You can also use the Profiler component programmatically
import { Profiler } from 'react'

function onRenderCallback(
  id, // the "id" prop of the Profiler tree
  phase, // "mount" or "update"
  actualDuration, // time spent rendering
  baseDuration, // estimated time for the whole subtree without memoization
  startTime, // when React began rendering
  commitTime, // when React committed the updates
  interactions, // the Set of interactions that were being processed
) {
  // Log or send to analytics
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  })
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <YourApplicationComponents />
    </Profiler>
  )
}
```

### Performance Optimization Checklist

✅ Use React.memo for pure functional components  
✅ Memoize expensive calculations with useMemo  
✅ Memoize callback functions with useCallback  
✅ Implement virtualization for long lists  
✅ Use code splitting for large components  
✅ Optimize context to avoid unnecessary renders  
✅ Move CPU-intensive work to web workers  
✅ Implement debouncing and throttling for frequent events  
✅ Use production builds for deployment  
✅ Regularly profile your application
