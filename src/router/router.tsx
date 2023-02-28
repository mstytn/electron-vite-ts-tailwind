import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '@/Components/App'
import ErrorPage from '@/error-page'
import Root from './Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}