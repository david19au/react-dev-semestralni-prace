# TypeScript in React

This guide covers the essentials of using TypeScript with React, focusing on practical patterns and configurations that will help you build type-safe React applications.

## Table of Contents

- [File Extensions](#file-extensions)
- [TSConfig for React](#tsconfig-for-react)
- [Typing Component Props](#typing-component-props)
- [Typing Hooks](#typing-hooks)
- [Event Handling](#event-handling)
- [Extending HTML Elements](#extending-html-elements)
- [Type-Safe Context](#type-safe-context)
- [Working with Reducers](#working-with-reducers)
- [Component Patterns](#component-patterns)
- [Common Utility Types](#common-utility-types)

## File Extensions

When using TypeScript with React, you'll use different file extensions depending on the content:

| Extension | Usage                                                      |
| --------- | ---------------------------------------------------------- |
| `.tsx`    | React components (files that contain JSX)                  |
| `.ts`     | Regular TypeScript files (utilities, hooks, context, etc.) |

```tsx
// Example.tsx - A React component file
import React from 'react'

interface ExampleProps {
  title: string
}

const Example: React.FC<ExampleProps> = ({ title }) => {
  return <h1>{title}</h1>
}

export default Example
```

```typescript
// utils.ts - A regular TypeScript file
export function formatDate(date: Date): string {
  return date.toLocaleDateString()
}
```

## TSConfig for React

A well-configured `tsconfig.json` is crucial for a good TypeScript+React development experience. Here's an explanation of important settings for React projects:

```json
{
  "compilerOptions": {
    // Specifies the JavaScript language version for emitted JavaScript
    "target": "ES2020",

    // Enables the use of the 'define' keyword for class fields
    "useDefineForClassFields": true,

    // Library files to include in the compilation
    "lib": ["ES2020", "DOM", "DOM.Iterable"],

    // Specifies module code generation method
    "module": "ESNext",

    // Skip type checking of declaration files (node_modules/@types)
    "skipLibCheck": true,

    /* Bundler mode settings */
    // Module resolution strategy (bundler is optimized for bundlers like Vite, webpack)
    "moduleResolution": "bundler",

    // Allows imports to include .ts and .tsx extensions in import paths
    "allowImportingTsExtensions": true,

    // Ensures imports are written as they are used (import type X from 'y')
    "verbatimModuleSyntax": true,

    // Forces automatic detection of whether a file is a module
    "moduleDetection": "force",

    // Don't emit output files (your bundler will handle this)
    "noEmit": true,

    // Support JSX for React (converts to React.createElement calls)
    "jsx": "react-jsx",

    /* Linting settings */
    // Enable all strict type-checking options
    "strict": true,

    // Error on unused local variables
    "noUnusedLocals": true,

    // Error on unused parameters
    "noUnusedParameters": true,

    // Only report errors on actual code (not declarative code)
    "erasableSyntaxOnly": true,

    // Error on fallthrough cases in switch statements
    "noFallthroughCasesInSwitch": true,

    // Error on imports with unchecked side effects
    "noUncheckedSideEffectImports": true
  },

  // Files to include in compilation
  "include": ["src"]
}
```

### Key Settings Explained

- **jsx: "react-jsx"**: Enables JSX support and auto-imports React in modern React applications (React 17+)
- **strict: true**: Enables strict type checking, essential for catching errors
- **moduleResolution: "bundler"**: Optimized for bundlers like Vite or webpack
- **noEmit: true**: Prevents TypeScript from outputting JavaScript files (your bundler handles this)
- **target: "ES2020"**: Sets the JavaScript version that TypeScript will compile to

## Typing Component Props

TypeScript makes component props type-safe, allowing you to catch prop errors at compile time:

### Function Components

```tsx
// Basic props typing
interface UserProfileProps {
  name: string
  age: number
  isAdmin?: boolean // Optional prop
  onLogout: () => void
}

// Function component with typed props
function UserProfile({ name, age, isAdmin = false, onLogout }: UserProfileProps) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      {isAdmin && <span>Administrator</span>}
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

// Usage
;<UserProfile name="John" age={30} isAdmin={true} onLogout={() => console.log('logged out')} />
```

### React.FC (Functional Component)

```tsx
// Using React.FC (less common in modern React)
import React from 'react'

interface GreetingProps {
  name: string
}

const Greeting: React.FC<GreetingProps> = ({ name, children }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {children}
    </div>
  )
}

// React.FC automatically includes children prop
// The above component accepts the following:
;<Greeting name="John">
  <p>This is a child element</p>
</Greeting>
```

### Children Props

```tsx
// Explicitly typing children
interface ContainerProps {
  children: React.ReactNode
  className?: string
}

function Container({ children, className }: ContainerProps) {
  return <div className={className}>{children}</div>
}
```

### Props with Different Types

```tsx
// Props that can be different types
type MessageProps =
  | { type: 'text'; content: string }
  | { type: 'image'; src: string; alt: string };

function Message(props: MessageProps) {
  if (props.type === 'text') {
    return <p>{props.content}</p>;
  } else {
    return <img src={props.src} alt={props.alt} />;
  }
}

// Usage
<Message type="text" content="Hello World" />
<Message type="image" src="/image.png" alt="An example image" />
```

## Typing Hooks

### useState

```tsx
import { useState } from 'react'

function Counter() {
  // Type inferred from initial value
  const [count, setCount] = useState(0)

  // Explicit type annotation
  const [user, setUser] = useState<{ name: string; age: number } | null>(null)

  // For complex types
  type User = {
    id: number
    name: string
    email: string
  }

  const [users, setUsers] = useState<User[]>([])

  // Usage
  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser])
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      {user && <p>User: {user.name}</p>}
      <button onClick={() => setUser({ name: 'John', age: 30 })}>Set User</button>
    </div>
  )
}
```

### useRef

```tsx
import { useRef, useEffect } from 'react'

function TextInput() {
  // Ref for DOM elements
  const inputRef = useRef<HTMLInputElement>(null)

  // Ref for mutable values
  const countRef = useRef<number>(0)

  useEffect(() => {
    // Focus the input on mount
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Update countRef without causing re-renders
    countRef.current += 1
  }, [])

  return <input ref={inputRef} type="text" />
}
```

### useReducer

```tsx
import { useReducer } from 'react'

// Define the state shape
interface State {
  count: number
  error: string | null
}

// Define action types
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'RESET' } | { type: 'SET_COUNT'; payload: number }

// Reducer function with type safety
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1, error: null }
    case 'DECREMENT':
      if (state.count <= 0) {
        return { ...state, error: 'Count cannot be negative' }
      }
      return { ...state, count: state.count - 1, error: null }
    case 'RESET':
      return { count: 0, error: null }
    case 'SET_COUNT':
      return { ...state, count: action.payload, error: null }
    default:
      // Exhaustive type checking
      const _exhaustiveCheck: never = action
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, error: null })

  return (
    <div>
      <p>Count: {state.count}</p>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}

      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'SET_COUNT', payload: 10 })}>Set to 10</button>
    </div>
  )
}
```

## Event Handling

React has built-in TypeScript definitions for event handling:

```tsx
function EventHandlingExample() {
  // Mouse events
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked', event.currentTarget.name)
  }

  // Form events
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submitted')
  }

  // Input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', event.target.value)
  }

  // Keyboard events
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} onKeyPress={handleKeyPress} />
      <button name="submitButton" onClick={handleClick} type="submit">
        Submit
      </button>
    </form>
  )
}
```

## Extending HTML Elements

Creating custom components that extend HTML elements while preserving their props:

```tsx
// Create a custom button that accepts all HTML button attributes
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
}

function Button({ variant = 'primary', isLoading = false, children, className, disabled, ...rest }: ButtonProps) {
  // Combine custom classes with provided className
  const buttonClass = `button button-${variant} ${className || ''}`

  return (
    <button className={buttonClass} disabled={disabled || isLoading} {...rest}>
      {isLoading ? 'Loading...' : children}
    </button>
  )
}

// Usage: Our custom Button accepts all standard button attributes
;<Button
  variant="primary"
  isLoading={isSubmitting}
  onClick={handleClick}
  type="submit"
  disabled={!isValid}
  aria-label="Submit form"
>
  Submit
</Button>
```

Another example with an input component:

```tsx
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

function Input({ label, error, className, ...rest }: InputProps) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input className={`form-input ${error ? 'input-error' : ''} ${className || ''}`} {...rest} />
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

// Usage
;<Input
  label="Email"
  type="email"
  name="email"
  placeholder="Enter email"
  required
  value={email}
  onChange={handleChange}
  error={errors.email}
/>
```

## Type-Safe Context

Creating and using context with TypeScript:

```tsx
import { createContext, useContext, useState, ReactNode } from 'react'

// Define context type
interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

// Define user type
interface User {
  id: string
  username: string
  email: string
  isAdmin: boolean
}

// Create context with an initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) return false

      const userData: User = await response.json()
      setUser(userData)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
  }

  const value = { user, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook for using this context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

// Usage in components
function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) {
    return <p>Please log in</p>
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
      {user.isAdmin && <p>Admin privileges enabled</p>}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

## Working with Reducers

Creating type-safe reducers for complex state management:

```tsx
import { useReducer } from 'react'

// Define the state shape
interface CartState {
  items: CartItem[]
  total: number
  loading: boolean
  error: string | null
}

// Define the cart item shape
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

// Define action types with discriminated unions
type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }

// Create the reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id)

      if (existingItemIndex >= 0) {
        // Item already exists, increase quantity
        const newItems = [...state.items]
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1,
        }

        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
        }
      } else {
        // Add new item
        const newItem = { ...action.payload, quantity: 1 }
        const newItems = [...state.items, newItem]

        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
        }
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter((item) => item.id !== action.payload.id)

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      }
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id } })
      }

      const newItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item))

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      }
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }

    default:
      // This ensures exhaustive type checking
      const _exhaustiveCheck: never = action
      return state
  }
}

// Helper function to calculate total
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// Initial state
const initialCartState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
}

// Cart component using the reducer
function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {state.loading && <p>Loading...</p>}
      {state.error && <p className="error">{state.error}</p>}

      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {state.items.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>

                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <button onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <strong>Total: ${state.total.toFixed(2)}</strong>
            <button onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  )
}
```

## Component Patterns

### Generic Components

Creating reusable components with generics:

```tsx
// A select component that works with any data type
interface SelectProps<T> {
  items: T[]
  selectedItem: T | null
  onChange: (item: T) => void
  getLabel: (item: T) => string
  getValue: (item: T) => string | number
}

function Select<T>({ items, selectedItem, onChange, getLabel, getValue }: SelectProps<T>) {
  return (
    <select
      value={selectedItem ? getValue(selectedItem).toString() : ''}
      onChange={(e) => {
        const value = e.target.value
        const selected = items.find((item) => getValue(item).toString() === value) || null
        onChange(selected as T)
      }}
    >
      <option value="">Select an option</option>
      {items.map((item) => (
        <option key={getValue(item).toString()} value={getValue(item).toString()}>
          {getLabel(item)}
        </option>
      ))}
    </select>
  )
}

// Usage with different data types
interface User {
  id: number
  name: string
  email: string
}

interface Product {
  productId: string
  title: string
  price: number
}

function App() {
  const users: User[] = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' },
  ]

  const products: Product[] = [
    { productId: 'p1', title: 'Phone', price: 499 },
    { productId: 'p2', title: 'Laptop', price: 999 },
  ]

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div>
      <h2>Select User</h2>
      <Select<User>
        items={users}
        selectedItem={selectedUser}
        onChange={setSelectedUser}
        getLabel={(user) => user.name}
        getValue={(user) => user.id}
      />

      <h2>Select Product</h2>
      <Select<Product>
        items={products}
        selectedItem={selectedProduct}
        onChange={setSelectedProduct}
        getLabel={(product) => `${product.title} ($${product.price})`}
        getValue={(product) => product.productId}
      />
    </div>
  )
}
```

### Render Props with TypeScript

```tsx
interface DataFetcherProps<T> {
  url: string
  render: (state: { data: T | null; loading: boolean; error: Error | null; refetch: () => void }) => React.ReactNode
}

function DataFetcher<T>({ url, render }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'))
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return <>{render({ data, loading, error, refetch: fetchData })}</>
}

// Usage
interface Post {
  id: number
  title: string
  body: string
}

function PostsList() {
  return (
    <DataFetcher<Post[]>
      url="https://jsonplaceholder.typicode.com/posts"
      render={({ data, loading, error, refetch }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error: {error.message}</p>
        if (!data) return <p>No data</p>

        return (
          <div>
            <button onClick={refetch}>Refresh</button>
            <ul>
              {data.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          </div>
        )
      }}
    />
  )
}
```

## Common Utility Types

TypeScript provides several utility types to help with common type transformations:

```tsx
// Partial - Makes all properties optional
interface User {
  id: number
  name: string
  email: string
  isAdmin: boolean
}

// Makes all User properties optional
function updateUser(id: number, userUpdate: Partial<User>) {
  // Implementation
}

// Call with only the fields to update
updateUser(1, { name: 'New Name' })

// Required - Makes all properties required
interface ProfileSettings {
  theme?: string
  notifications?: boolean
  language?: string
}

// Ensures all settings are provided
function applySettings(settings: Required<ProfileSettings>) {
  // Implementation
}

// Pick - Create a type with a subset of properties
type UserBasicInfo = Pick<User, 'id' | 'name'>

// UserBasicInfo is equivalent to:
// interface UserBasicInfo {
//   id: number;
//   name: string;
// }

// Omit - Create a type without specified properties
type UserWithoutId = Omit<User, 'id'>

// UserWithoutId is equivalent to:
// interface UserWithoutId {
//   name: string;
//   email: string;
//   isAdmin: boolean;
// }

// Record - Create a type with specified keys and values
type UserRoles = Record<string, boolean>

// UserRoles is equivalent to:
// interface UserRoles {
//   [key: string]: boolean;
// }

const roles: UserRoles = {
  admin: true,
  editor: false,
  viewer: true,
}

// ReturnType - Extract the return type of a function
function createUser(name: string, email: string): User {
  return { id: Date.now(), name, email, isAdmin: false }
}

type NewUser = ReturnType<typeof createUser>

// NewUser is the same as User

// Parameters - Extract parameter types from a function
type CreateUserParams = Parameters<typeof createUser>

// CreateUserParams is [string, string]

// Readonly - Make all properties readonly
type ReadonlyUser = Readonly<User>

// ReadonlyUser is equivalent to:
// interface ReadonlyUser {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
//   readonly isAdmin: boolean;
// }

// NonNullable - Remove null and undefined from a type
type MaybeString = string | null | undefined
type DefinitelyString = NonNullable<MaybeString>

// DefinitelyString is just string
```

These utility types help create precise and DRY type definitions for your React components and functions, making your code more maintainable and type-safe.
