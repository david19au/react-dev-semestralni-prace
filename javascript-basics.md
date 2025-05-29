# JavaScript for React

This guide focuses on JavaScript concepts that are particularly relevant for React development. Instead of covering basic syntax, we'll explore the JavaScript features and patterns commonly used in React applications.

## Table of Contents

- [Modern JavaScript Features](#modern-javascript-features)
- [Functions in React Context](#functions-in-react-context)
- [Objects and Destructuring](#objects-and-destructuring)
- [Array Methods for React](#array-methods-for-react)
- [Asynchronous JavaScript in React](#asynchronous-javascript-in-react)
- [ES Modules](#es-modules)
- [Working with Events](#working-with-events)
- [Conditional Rendering Patterns](#conditional-rendering-patterns)

## Modern JavaScript Features

React leverages many modern JavaScript features. Here are the most important ones:

### Arrow Functions

Arrow functions are extensively used in React for their concise syntax and lexical `this` binding:

```javascript
// Regular function
function Button(props) {
  return <button>{props.text}</button>
}

// Arrow function component
const Button = (props) => <button>{props.text}</button>

// Arrow function in event handlers
const handleClick = () => {
  console.log('Button clicked')
}

// Arrow functions in callbacks
const doubled = numbers.map((num) => num * 2)
```

### Template Literals

Template literals make string interpolation more readable:

```javascript
// Dynamic class names
<div className={`card ${isActive ? 'active' : ''}`}>

// Constructing URLs
const url = `https://api.example.com/users/${userId}`;

// Creating complex strings
const greeting = `Hello, ${user.name}! You have ${notifications.length} new notifications.`;
```

### Destructuring

Destructuring makes working with props and state more elegant:

```javascript
// Props destructuring in functional components
function UserProfile({ name, email, avatar }) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  )
}

// Array destructuring with React hooks
const [count, setCount] = useState(0)
const [user, setUser] = useState(null)

// Nested destructuring
const {
  user: {
    name,
    address: { city },
  },
} = props
```

### Spread Operator

The spread operator is useful for immutable updates and prop spreading:

```javascript
// Copying arrays or objects (immutability)
const newItems = [...items, newItem]
const updatedUser = { ...user, name: 'New Name' }

// Spreading props
;<UserCard {...userProps} />

// Merging objects
const mergedSettings = { ...defaultSettings, ...userSettings }
```

### Rest Parameters

Rest parameters help collect remaining props:

```javascript
// Collecting remaining props
function Button({ className, ...rest }) {
  return <button className={`btn ${className}`} {...rest} />
}

// Collecting remaining items
const [first, second, ...others] = items
```

### Optional Chaining

Optional chaining prevents errors when accessing nested properties:

```javascript
// Safely accessing nested data
const userName = user?.profile?.name

// With function calls
const count = data?.results?.length

// With arrays
const firstItem = items?.[0]?.name
```

### Nullish Coalescing

Nullish coalescing provides better default values:

```javascript
// Default values (only for null/undefined)
const displayName = user.name ?? 'Anonymous'

// Combining with optional chaining
const count = data?.count ?? 0
```

## Functions in React Context

Functions are central to React development. Here's how they're commonly used:

### Callback Functions

```javascript
// Event handlers
function handleClick(event) {
  console.log('Button clicked')
}

// Passing callbacks to child components
;<Button onClick={() => setCount(count + 1)}>Increment</Button>

// Array method callbacks
const todoItems = todos.map((todo) => <TodoItem key={todo.id} text={todo.text} />)
```

### Higher-Order Functions

Higher-order functions are functions that take or return other functions:

```javascript
// Higher-order component pattern
function withLogging(Component) {
  return function LoggedComponent(props) {
    console.log(`Rendering ${Component.name} with props:`, props)
    return <Component {...props} />
  }
}

// Using Array methods
const activeUsers = users.filter((user) => user.isActive)
const userNames = users.map((user) => user.name)
```

### Function Closures

Closures occur when functions retain access to their outer scope variables:

```javascript
function Counter() {
  const [count, setCount] = useState(0)

  // This function "closes over" the count variable
  const increment = () => {
    setCount(count + 1)
  }

  return <button onClick={increment}>Count: {count}</button>
}
```

## Objects and Destructuring

Objects are fundamental to React for managing state, props, and configuration:

### Working with Objects

```javascript
// Creating component state
const [user, setUser] = useState({
  name: 'John',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    notifications: true,
  },
})

// Updating state immutably
setUser({
  ...user,
  preferences: {
    ...user.preferences,
    theme: 'light',
  },
})
```

### Object Methods

```javascript
// Object.keys() for rendering object properties
{
  Object.keys(errors).map((field) => <ErrorMessage key={field} message={errors[field]} />)
}

// Object.entries() for key-value pairs
{
  Object.entries(userData).map(([key, value]) => (
    <div key={key}>
      <strong>{key}:</strong> {value}
    </div>
  ))
}
```

## Array Methods for React

These array methods are extremely useful in React for working with lists of data:

### map

The `map` method is essential for rendering lists in React:

```javascript
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### filter

The `filter` method helps display only items that match certain criteria:

```javascript
// Filtering a list of items
const activeUsers = users.filter((user) => user.isActive)

// In a component
function ActiveUserList({ users }) {
  const activeUsers = users.filter((user) => user.isActive)
  return (
    <ul>
      {activeUsers.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### reduce

The `reduce` method can transform an array into any value, including objects and numbers:

```javascript
// Grouping items by a property
const usersByRole = users.reduce((grouped, user) => {
  const role = user.role || 'guest'
  grouped[role] = grouped[role] || []
  grouped[role].push(user)
  return grouped
}, {})

// Calculating totals
const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
```

### find

The `find` method locates a specific item in an array:

```javascript
// Finding a specific user
const currentUser = users.find((user) => user.id === currentUserId)

// In event handlers
function handleEdit(userId) {
  const userToEdit = users.find((user) => user.id === userId)
  setEditingUser(userToEdit)
}
```

### some and every

These methods check if some or all items meet a condition:

```javascript
// Check if any user is an admin
const hasAdmin = users.some((user) => user.role === 'admin')

// Check if all tasks are completed
const allCompleted = tasks.every((task) => task.completed)

// In conditional rendering
{
  hasAdmin && <AdminPanel />
}
{
  allCompleted && <CompletionMessage />
}
```

## Asynchronous JavaScript in React

Handling asynchronous operations is crucial in React applications:

### Promises

Promises are used for handling asynchronous operations:

```javascript
// Fetching data in a component
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://api.example.com/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }
        return response.json()
      })
      .then((data) => {
        setUser(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }, [userId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!user) return <p>No user found</p>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

### async/await

The `async/await` syntax makes asynchronous code more readable:

```javascript
// Using async/await in event handlers
const handleSubmit = async (event) => {
  event.preventDefault()
  setLoading(true)

  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Failed to create user')
    }

    const data = await response.json()
    setUser(data)
    setSuccess(true)
  } catch (error) {
    setError(error.message)
  } finally {
    setLoading(false)
  }
}

// Using async/await with useEffect
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://api.example.com/data')
      const data = await response.json()
      setData(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [])
```

## ES Modules

React applications use the ES modules system for organizing code:

```javascript
// Importing React and hooks
import React, { useState, useEffect } from 'react'

// Importing components
import Header from './components/Header'
import UserList from './components/UserList'

// Importing utilities
import { formatDate, sortByName } from './utils'

// Named and default exports
export const Button = ({ children, ...props }) => <button {...props}>{children}</button>

export default function App() {
  return <div>My App</div>
}
```

## Working with Events

Event handling is fundamental to creating interactive React applications:

```javascript
function Form() {
  const [name, setName] = useState('')

  // Event handler for input change
  const handleChange = (event) => {
    setName(event.target.value)
  }

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Submitted name:', name)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleChange} placeholder="Enter your name" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Synthetic Events

React wraps native browser events with its own event system:

```javascript
// Stopping propagation
const handleClick = (event) => {
  event.stopPropagation()
  console.log('Button clicked')
}

// Preventing default behavior
const handleSubmit = (event) => {
  event.preventDefault()
  // Form handling logic
}

// Accessing event properties
const handleMouseMove = (event) => {
  const { clientX, clientY } = event
  setPosition({ x: clientX, y: clientY })
}
```

## Conditional Rendering Patterns

JavaScript's conditional expressions enable dynamic UI rendering in React:

```javascript
function UserProfile({ user, isLoading, error }) {
  // Early return pattern
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!user) {
    return <div>No user found</div>
  }

  // Conditional rendering with ternary operator
  return (
    <div>
      <h1>{user.name}</h1>
      {user.isAdmin ? <AdminBadge /> : null}

      {/* Logical AND for conditional rendering */}
      {user.posts.length > 0 && (
        <div>
          <h2>Posts</h2>
          <PostList posts={user.posts} />
        </div>
      )}

      {/* Switch-like conditional rendering */}
      {(() => {
        switch (user.role) {
          case 'admin':
            return <AdminPanel />
          case 'moderator':
            return <ModeratorPanel />
          default:
            return <UserPanel />
        }
      })()}
    </div>
  )
}
```

## Useful Resources for React JavaScript

- [React Documentation](https://react.dev/) - Official React documentation
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) - Comprehensive JavaScript resource
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- [ESLint](https://eslint.org/) - Tool for identifying problematic patterns in JavaScript code
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Babel](https://babeljs.io/) - JavaScript compiler

## Set and Map

### Set

A Set is a collection of unique values. Each value can occur only once in a Set.

```javascript
// Creating a Set
const uniqueNumbers = new Set([1, 2, 3, 3, 4, 4, 5]) // [1, 2, 3, 4, 5]

// Adding values
uniqueNumbers.add(6)
uniqueNumbers.add(1) // Won't add duplicate

// Checking values
console.log(uniqueNumbers.has(3)) // true
console.log(uniqueNumbers.size) // 6

// Removing values
uniqueNumbers.delete(3)

// Iterating
for (const number of uniqueNumbers) {
  console.log(number)
}

// Converting to Array
const array = [...uniqueNumbers]
```

### Map

A Map is a collection of key-value pairs where keys can be of any type.

```javascript
// Creating a Map
const userMap = new Map()

// Adding entries
userMap.set('id', 1)
userMap.set('name', 'John')
userMap.set({ key: 'object' }, 'value') // Object as key

// Getting values
console.log(userMap.get('name')) // 'John'

// Checking keys
console.log(userMap.has('id')) // true

// Removing entries
userMap.delete('id')

// Iterating
for (const [key, value] of userMap) {
  console.log(`${key}: ${value}`)
}

// Converting to Array
const entries = [...userMap.entries()]
```

## Events

JavaScript allows responding to various events that occur in the browser.

### Basic Events

```javascript
// Mouse events
element.addEventListener('click', function (event) {
  console.log('Click on element')
})

element.addEventListener('mouseover', function (event) {
  console.log('Mouse is over element')
})

element.addEventListener('mouseout', function (event) {
  console.log('Mouse left element')
})

// Keyboard events
document.addEventListener('keydown', function (event) {
  console.log(`Key pressed: ${event.key}`)
})

// Form events
form.addEventListener('submit', function (event) {
  event.preventDefault() // Prevent default behavior (form submission)
  console.log('Form was submitted')
})

input.addEventListener('change', function (event) {
  console.log(`Value changed to: ${event.target.value}`)
})

// Window events
window.addEventListener('load', function () {
  console.log('Page was loaded')
})

window.addEventListener('resize', function () {
  console.log(`Window size: ${window.innerWidth}x${window.innerHeight}`)
})
```

### Event Object

When an event occurs, JavaScript creates an event object that contains information about the event.

```javascript
element.addEventListener('click', function (event) {
  console.log(event.type) // "click"
  console.log(event.target) // Element that was clicked
  console.log(event.clientX) // X coordinate of click
  console.log(event.clientY) // Y coordinate of click
  console.log(event.preventDefault) // Function to prevent default behavior
  console.log(event.stopPropagation) // Function to stop event propagation
})
```

### Event Delegation

Event delegation is a technique where an event is captured on a parent element and processed based on the target element.

```javascript
// Instead of adding an event to each element
const buttons = document.querySelectorAll('button')
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    console.log('Button clicked')
  })
})

// Use event delegation
const container = document.querySelector('.container')
container.addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') {
    console.log('Button clicked')
  }
})
```

## Asynchronous Programming

JavaScript is a single-threaded language, which means it can only execute one block of code at a time. Asynchronous programming allows performing long-running operations without blocking the main thread.

### Callback Functions

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: 'John', age: 30 }
    callback(data)
  }, 1000)
}

fetchData((data) => {
  console.log(data) // { name: "John", age: 30 }
})
```

Callback functions are passed as arguments to other functions and are called after the operation is completed. They can lead to "callback hell" (nested callbacks), which makes code harder to read and maintain.

### Promises

A Promise is an object that represents the completion (or failure) of an asynchronous operation and its resulting value.

```javascript
const promise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true

  if (success) {
    resolve({ name: 'John', age: 30 })
  } else {
    reject(new Error('Operation failed'))
  }
})

promise
  .then((data) => {
    console.log(data) // { name: "John", age: 30 }
  })
  .catch((error) => {
    console.error(error)
  })
```

A Promise has three states:

- **Pending**: Initial state, operation is not yet completed
- **Fulfilled**: Operation was successfully completed
- **Rejected**: Operation failed

### async/await

`async/await` is syntactic sugar over Promises that allows writing asynchronous code in a synchronous style.

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

// Usage
fetchData()
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })
```

Key terms:

- `async` before a function indicates that the function returns a Promise
- `await` can only be used inside an `async` function and waits for a Promise to complete
- `try/catch` block allows catching errors in asynchronous code

### Parallel Processing

```javascript
async function fetchMultipleData() {
  try {
    // Parallel processing of multiple Promises
    const [data1, data2] = await Promise.all([
      fetch('https://api.example.com/data1').then((res) => res.json()),
      fetch('https://api.example.com/data2').then((res) => res.json()),
    ])

    return { data1, data2 }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
```

`Promise.all()` allows running multiple Promises in parallel and waiting for all of them to complete.

## Document and Window Objects

### Document Object

The `document` object represents the web page and provides access to its content.

```javascript
// Selecting elements
const element = document.getElementById('myId')
const elements = document.getElementsByClassName('myClass')
const elements = document.getElementsByTagName('div')
const element = document.querySelector('.myClass')
const elements = document.querySelectorAll('.myClass')

// Creating elements
const div = document.createElement('div')
div.textContent = 'Hello World'
document.body.appendChild(div)

// Modifying elements
element.style.color = 'red'
element.classList.add('active')
element.setAttribute('data-id', '123')

// Event handling
document.addEventListener('DOMContentLoaded', () => {
  console.log('Document loaded')
})
```

### Window Object

The `window` object represents the browser window and provides global functions and properties.

```javascript
// Window properties
console.log(window.innerWidth) // Window width
console.log(window.innerHeight) // Window height
console.log(window.location.href) // Current URL

// Window methods
window.scrollTo(0, 100) // Scroll to position
window.alert('Hello') // Show alert
window.confirm('Continue?') // Show confirmation
window.prompt('Enter name') // Show prompt

// Timing functions
const timeoutId = setTimeout(() => {
  console.log('After 1 second')
}, 1000)

const intervalId = setInterval(() => {
  console.log('Every second')
}, 1000)

// Clearing timers
clearTimeout(timeoutId)
clearInterval(intervalId)
```

## Polyfills

Polyfills are code that implements a feature on web browsers that don't support the feature natively. They "fill in" the gaps in browser support.

```javascript
// Example: Array.prototype.includes polyfill
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement, fromIndex) {
    if (this == null) {
      throw new TypeError('"this" is null or undefined')
    }

    var o = Object(this)
    var len = o.length >>> 0

    if (len === 0) {
      return false
    }

    var n = fromIndex | 0
    var k = Math.max(n >= 0 ? n : len + n, 0)

    while (k < len) {
      if (o[k] === searchElement) {
        return true
      }
      k++
    }
    return false
  }
}
```

Common use cases for polyfills:

1. Supporting new JavaScript features in older browsers
2. Implementing missing browser APIs
3. Ensuring consistent behavior across browsers

Modern development often uses tools like Babel to automatically handle polyfills, but understanding how they work is important for legacy code maintenance and debugging.

## Useful Links

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Official JavaScript documentation
- [MDN Web Docs - DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) - DOM API documentation
- [MDN Web Docs - Events](https://developer.mozilla.org/en-US/docs/Web/Events) - Event handling documentation
- [MDN Web Docs - Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) - Promise API documentation
- [MDN Web Docs - async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) - async/await documentation
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/) - Interactive JavaScript tutorial
- [ECMAScript Specification](https://tc39.es/ecma262/) - Official ECMAScript specification
- [Can I Use](https://caniuse.com/) - Browser compatibility tables
- [JavaScript Weekly](https://javascriptweekly.com/) - Weekly JavaScript newsletter
