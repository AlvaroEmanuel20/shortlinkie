import { styled, useTheme } from 'styled-components';
import Logo from '../../assets/Logo';
import { Stack } from '../../components/Stack';
import HomeIcon from '../../assets/HomeIcon';
import LogoutIcon from '../../assets/LogoutIcon';
import { Link } from 'react-router-dom';
import useAuth from '../../auth/hooks/useAuth';
import { Loader } from '../../components/Loader';

export const SidebarStyle = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.white};
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;

  @media (max-width: 655px) {
    display: none;
  }
`;

export default function Sidebar() {
  const { logout, loadingLogout } = useAuth();
  const theme = useTheme();

  return (
    <SidebarStyle>
      <Stack $spacing={35} $items="center">
        <Logo />

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
    </SidebarStyle>
  );
}
