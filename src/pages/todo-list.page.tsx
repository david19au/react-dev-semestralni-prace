import { Header } from "../components/header";
import { TodosSection } from "../components/todos/todos-section";

const TodoListPage = () => {
  return (
    <>
      <Header title="My Todo List" subtitle="Add your tasks" />
      <TodosSection />
      <footer>
        <p>Click on a task to see its details.</p>
      </footer>
    </>
  );
};

export default TodoListPage;
