import { keyframes, styled, useTheme } from 'styled-components';
import { Stack } from '../../components/Stack';
import HomeIcon from '../../assets/HomeIcon';
import LogoutIcon from '../../assets/LogoutIcon';
import { Link } from 'react-router-dom';
import useAuth from '../../auth/hooks/useAuth';
import { Loader } from '../../components/Loader';
import { SidebarStyle } from './Sidebar';
import Close from '../../assets/Close';
import { useEffect } from 'react';

const animation = keyframes`
  from {
    margin-left: -5rem;
  }

  to {
    margin-left: 0;
  }
`;

const MobileSidebarStyle = styled(SidebarStyle)<{ $isOpen: boolean }>`
  animation: ${animation} 300ms ease;
  z-index: 50;

  @media (max-width: 655px) {
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  }

  @media (min-width: 656px) {
    display: none;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colors.blackAlpha};
  width: 100vw;
  height: 100vh;
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
    const htmlTag = document.querySelector('html');
    const bodyTag = document.querySelector('body');

    if (isOpen) {
      htmlTag ? (htmlTag.style.overflowY = 'hidden') : null;
      bodyTag ? (bodyTag.style.overflowY = 'hidden') : null;
    } else {
      htmlTag ? (htmlTag.style.overflowY = 'visible') : null;
      bodyTag ? (bodyTag.style.overflowY = 'visible') : null;
    }
  }, [isOpen]);

  return (
    <>
      <MobileSidebarStyle $isOpen={isOpen}>
        <Stack $spacing={35} $items="center">
          <button onClick={close}>
            <Close />
          </button>

          <Link to="/">
            <HomeIcon />
          </Link>
        </Stack>

        <button onClick={logout}>
          {loadingLogout ? (
            <Loader
              color={theme.colors.orange1}
              $width="20px"
              $height="20px"
              $borderWidth="3px"
            />
          ) : (
            <LogoutIcon />
          )}
        </button>
      </MobileSidebarStyle>

      <Overlay $isOpen={isOpen} />
    </>
  );
}
