import { styled } from 'styled-components';
import Sidebar from './components/Sidebar';
import Appbar from './components/AppBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/context/AuthContext';

const DashboardStyle = styled.div`
  background-color: ${(props) => props.theme.colors.gray};
  padding: 30px 30px 30px calc(80px + 30px);
  min-height: 100vh;
`;

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.isAuthenticated) navigate('/login');
  }, [auth?.isAuthenticated]);

  return (
    <DashboardStyle>
      <Sidebar />
      <Appbar />

      <Outlet />
    </DashboardStyle>
  );
}
