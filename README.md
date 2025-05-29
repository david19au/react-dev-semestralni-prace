# Todo App - React

A simple task management application built with React that we will create step by step. We'll implement a clean React-based todo application with modern hooks and state management.

This project is part of the **React Programming Basics (4IT427)** course at the University of Economics in Prague.

## Table of Contents

- [Project Description](#project-description)
- [How to Run the Project](#how-to-run-the-project)
- [React Structure](#react-structure)
- [Documentation](#documentation)
- [How to Work with This Repository](#how-to-work-with-this-repository)

## Project Description

In this project, we will together create a React-based task management application. The application already has a basic structure and UI components, and we'll implement the functionality to:

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Display a list of all tasks
- Filter tasks by status

This approach will help you understand core React concepts including components, state management, hooks, and how they all work together to create a dynamic user interface.

## How to Run the Project

1. Make sure you have Node.js installed
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser at: `http://localhost:5173`

## React Structure

The basic React structure of our application consists of functional components:

```jsx
function App() {
  return (
    <>
      <div className="container">
        <header>
          <h1>My Todo List</h1>
          <p className="subtitle">Add your tasks</p>
        </header>
        <main>
          <form id="todo-form">
            <div className="input-group">
              <input name="todo-text" id="new-todo-input" placeholder="What needs to be done?" />
              <button type="submit" id="add-btn">
                Add
              </button>
            </div>
          </form>
          <div className="todo-container">
            <ul id="todo-list"></ul>
          </div>
        </main>
        <footer>
          <p>Click on a task to mark it as completed</p>
        </footer>
      </div>
    </>
  )
}
```

Main elements we'll be working with:

- `App` component - the main container for our application
- Todo input form - for adding new tasks
- Todo list - to display tasks dynamically
- We'll add additional components like `TodoItem`, `TodoList`, `TodoForm`, etc.

## Documentation

For detailed information about React concepts used in this project, please refer to:

- [React Basics](react-basics.md) - Comprehensive guide to React fundamentals
- [JavaScript Basics](javascript-basics.md) - Guide to JavaScript concepts used in React
- [TypeScript Basics](typescript-basics.md) - How TypeScript enhances React development
- [TypeScript in React](typescript-react.md) - Practical guide to using TypeScript with React

### API Documentation

This project uses a RESTful API for managing todos. The API is documented using Swagger UI:

- [API Documentation](https://eli-workshop.vercel.app/api-docs) - Interactive API documentation
- [Todos Endpoint](https://eli-workshop.vercel.app/api/todos) - Direct access to todos data

## How to Work with This Repository

### For Students

1. Fork the repository

   - Go to the repository URL
   - Click the "Fork" button in the top right corner
   - This will create your own copy of the repository

2. Clone your forked repository

   ```bash
   git clone https://github.com/YOUR_USERNAME/react-dev-intro.git
   cd react-dev-intro
   ```

3. Create a new branch with your INSIS ID

   ```bash
   git checkout -b YOUR_INSIS_ID
   # Example: git checkout -b xjansa00
   ```

4. Make your changes

   - Work on your branch
   - Commit your changes regularly
   - Push your changes to your fork

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin YOUR_INSIS_ID
   ```

5. Create a Pull Request
   - Go to your forked repository on GitHub
   - Click "Compare & pull request"
   - Set the base repository as the original repository
   - Set the base branch as "master"
   - Set the head repository as your fork
   - Set the compare branch as your INSIS ID branch
   - Add a description of your changes
   - Submit the pull request

### Important Notes

- Always work on your own branch
- Keep your branch up to date with the main repository
  ```bash
   git remote add upstream https://github.com/JanSmrcka/react-dev-intro.git
   git fetch upstream
   git merge upstream/master
  ```
- Make meaningful commit messages
- Respond to any feedback on your pull request
