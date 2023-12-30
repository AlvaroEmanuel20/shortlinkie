import { styled, useTheme } from 'styled-components';
import { Stack } from '../Stack';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/auth.hooks/useAuth';
import { Loader } from '../Loader';
import { useEffect } from 'react';
import { LayoutDashboard, LogOutIcon, Settings } from 'lucide-react';
import { slideLeft } from '../animations/slideLeft';
import { Overlay } from './Overlay';
import { SidebarStyle } from './Sidebar';
import { NavLink } from 'react-router-dom';
import hiddenOverflowY from '../../lib/hiddenOverflowY';

const MobileSidebarStyle = styled(SidebarStyle)<{ $isOpen: boolean }>`
  animation: ${slideLeft} 300ms ease;
  background-color: ${(props) => props.theme.colors.light};
  z-index: 20;

  @media (min-width: 785px) {
    display: none;
  }

  @media (max-width: 784px) {
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  }
`;

export default function MobileSidebar({
  close,
  isOpen,
}: {
  close: () => void;
  isOpen: boolean;
}) {
  const { logout, loadingLogout } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    hiddenOverflowY(isOpen);
  }, [isOpen]);

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={close}></Overlay>
      <MobileSidebarStyle $isOpen={isOpen}>
        <Stack spacing={50} $items="center">
          <Link to="/">
            <img
              className="logo"
              src="/logo-blue.svg"
              alt="Logo do Encurtando"
            />
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
      </MobileSidebarStyle>
    </>
  );
}
