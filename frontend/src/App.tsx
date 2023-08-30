import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './auth/login';
import SignUp from './auth/signup';
import Home from './dashboard/Home';
import LinkPage from './dashboard/LinkPage';
import { AuthProvider } from './auth/context/AuthContext';
import Profile from './dashboard/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'link/:shortId',
        element: <LinkPage />,
      },
      {
        path: 'perfil',
        element: <Profile />,
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
