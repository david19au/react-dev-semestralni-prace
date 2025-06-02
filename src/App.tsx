import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/layout";
import { lazy, Suspense } from "react";
import { Spinner } from "./components/spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./providers/theme.provider";

const TodoDetailPage = lazy(() => import("./pages/todo-detail.page"));
const TodoListPage = lazy(() => import("./pages/todo-list.page"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<div>Page is loading</div>}>
                    <TodoListPage />
                  </Suspense>
                }
              />
              <Route
                path="/todos/:id"
                element={
                  <Suspense fallback={<Spinner />}>
                    <TodoDetailPage />
                  </Suspense>
                }
              />
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
