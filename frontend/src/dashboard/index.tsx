import { styled } from 'styled-components';
import Sidebar from './components/Sidebar';
import Appbar from './components/AppBar';
import { Outlet } from 'react-router-dom';

const DashboardStyle = styled.div`
  background-color: ${(props) => props.theme.colors.gray};
  padding: 30px 30px 30px calc(80px + 30px);
  min-height: 100vh;
`;

export default function Dashboard() {
  return (
    <DashboardStyle>
      <Sidebar />
      <Appbar />

      <Outlet />
    </DashboardStyle>
  );
}
