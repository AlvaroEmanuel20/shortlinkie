import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/dashboard.pages';
import Login from './pages/auth.pages/Login';
import SignUp from './pages/auth.pages/SignUp';
import Home from './pages/dashboard.pages/Home';
import LinkPage from './pages/dashboard.pages/LinkPage';
import Settings from './pages/dashboard.pages/Settings';
import ResetPass from './pages/auth.pages/ResetPass';
import NewPass from './pages/auth.pages/NewPass';
import { AuthProvider } from './context/auth.context/AuthContext';

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
        path: 'configuracoes',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/entrar',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <SignUp />,
  },
  {
    path: '/recuperar-senha',
    element: <ResetPass />,
  },
  {
    path: '/nova-senha',
    element: <NewPass />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
