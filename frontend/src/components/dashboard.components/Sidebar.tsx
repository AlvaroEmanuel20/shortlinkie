import { styled, useTheme } from 'styled-components';
import { Stack } from '../Stack';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/auth.hooks/useAuth';
import { Loader } from '../Loader';
import { LayoutDashboard, LogOutIcon, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const SidebarStyle = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  border-right: 1px solid ${(props) => props.theme.colors.gray1};
  width: 85px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 45px 22px;

  .logo {
    width: 42px;
  }

  a {
    display: flex;
  }

  @media (max-width: 784px) {
    display: none;
  }
`;

export default function Sidebar() {
  const theme = useTheme();
  const { logout, loadingLogout } = useAuth();

  return (
    <SidebarStyle>
      <Stack spacing={50} $items="center">
        <Link to="/">
          <img className="logo" src="/logo-blue.svg" alt="Logo do Encurtando" />
        </Link>

        <Stack spacing={20}>
          <NavLink to="/">
            {({ isActive }) =>
              isActive ? (
                <LayoutDashboard color={theme.colors.blue} />
              ) : (
                <LayoutDashboard color={theme.colors.gray} />
              )
            }
          </NavLink>

          <NavLink to="/configuracoes">
            {({ isActive }) =>
              isActive ? (
                <Settings color={theme.colors.blue} />
              ) : (
                <Settings color={theme.colors.gray} />
              )
            }
          </NavLink>
        </Stack>
      </Stack>

      <button onClick={logout}>
        {loadingLogout ? (
          <Loader width="22px" height="22px" $borderWidth="4px" />
        ) : (
          <LogOutIcon color={theme.colors.gray} />
        )}
      </button>
    </SidebarStyle>
  );
}
