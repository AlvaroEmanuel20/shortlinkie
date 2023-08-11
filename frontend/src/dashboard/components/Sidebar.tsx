import { styled } from 'styled-components';
import Logo from '../../assets/Logo';
import { Stack } from '../../components/Stack';
import HomeIcon from '../../assets/HomeIcon';
import LogoutIcon from '../../assets/LogoutIcon';
import { Link } from 'react-router-dom';

const SidebarStyle = styled.aside`
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
`;

export default function Sidebar() {
  return (
    <SidebarStyle>
      <Stack $spacing={35} $items="center">
        <Logo />

        <Link to="/">
          <HomeIcon />
        </Link>
      </Stack>

      <button>
        <LogoutIcon />
      </button>
    </SidebarStyle>
  );
}
