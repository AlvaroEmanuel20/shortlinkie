import { styled } from 'styled-components';
import { HStack } from '../../components/HStack';
import { Input } from '../../components/Input';
import { Avatar } from './Avatar';
import People from '../../assets/people.jpg';
import Skeleton from './Skeleton';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import Logo from '../../assets/Logo';
import Menu from '../../assets/Menu';

const AppbarStyle = styled.header`
  margin-bottom: 30px;

  .search {
    min-width: 380px;
  }

  @media (max-width: 655px) {
    .search {
      display: none;
    }
  }

  @media (min-width: 656px) {
    .menu {
      display: none;
    }

    svg {
      display: none;
    }
  }
`;

export default function Appbar() {
  const auth = useContext(AuthContext);

  return (
    <AppbarStyle>
      <HStack $spacing={20} $justify="space-between">
        <Logo />

        <Input type="search" placeholder="Pesquisar" className="search" />

        <HStack $spacing={15}>
          <Skeleton
            isLoading={!auth || !auth.user}
            $width="40px"
            $height="40px"
            $radius="100%"
          >
            <Link to="/perfil">
              {auth && auth.user && (
                <Avatar $bgImg={auth.user.avatarUrl || People} />
              )}
            </Link>
          </Skeleton>

          <button className="menu">
            <Menu />
          </button>
        </HStack>
      </HStack>
    </AppbarStyle>
  );
}
