import { styled } from 'styled-components';
import Sidebar from '../../components/dashboard.components/Sidebar';
import Appbar from '../../components/dashboard.components/AppBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context/AuthContext';

const DashboardStyle = styled.div`
  padding: 45px 45px 45px calc(85px + 45px);
  height: 100vh;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 45px 15px 45px calc(85px + 15px);
  }

  @media (max-width: 784px) {
    padding: 40px 15px;
  }
`;

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && !auth.isAuthenticated) {
      navigate('/entrar');
    }
  }, []);

  return (
    <DashboardStyle>
      <Sidebar />
      <Appbar />

      <Outlet />
    </DashboardStyle>
  );
}
