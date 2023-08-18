import { styled } from 'styled-components';
import { HStack } from '../../components/HStack';
import { Input } from '../../components/Input';
import { Avatar } from './Avatar';
import People from '../../assets/people.jpg';
import Skeleton from './Skeleton';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

const AppbarStyle = styled.header`
  margin-bottom: 30px;
`;

export default function Appbar() {
  const auth = useContext(AuthContext);

  return (
    <AppbarStyle>
      <HStack $spacing={20} $justify="space-between">
        <Input
          type="search"
          placeholder="Pesquisar"
          style={{ minWidth: 380 }}
        />

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
      </HStack>
    </AppbarStyle>
  );
}
