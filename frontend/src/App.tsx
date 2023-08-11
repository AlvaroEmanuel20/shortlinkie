import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './auth/login';
import SignUp from './auth/signup';
import Home from './dashboard/Home';
import LinkPage from './dashboard/LinkPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'link/:shortId',
        element: <LinkPage />,
      },
    ],
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
