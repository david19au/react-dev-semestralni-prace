import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/layout'
import { lazy, Suspense } from 'react'
import { Spinner } from './components/spinner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const TodoDetailPage = lazy(() => import('./pages/todo-detail.page'))
const TodoListPage = lazy(() => import('./pages/todo-list.page'))

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>is loading</div>}>
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
    </QueryClientProvider>
  )
}

export default App
