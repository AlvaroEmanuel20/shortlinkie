import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './auth/login';
import SignUp from './auth/signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'cadastro',
    element: <SignUp />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
