import { styled } from 'styled-components';
import { HStack } from '../../components/HStack';
import { Input } from '../../components/Input';
import { Avatar } from './Avatar';
import People from '../../assets/people.jpg';
import Skeleton from './Skeleton';
import useQuery from '../../hooks/useQuery';
import { User } from '../../lib/interfaces';

const AppbarStyle = styled.header`
  margin-bottom: 30px;
`;

export default function Appbar() {
  const { data: user, isLoading: isloadingUser } = useQuery<User>('/api/users');

  return (
    <AppbarStyle>
      <HStack $spacing={20} $justify="space-between">
        <Input
          type="search"
          placeholder="Pesquisar"
          style={{ minWidth: 380 }}
        />

        <Skeleton
          isLoading={isloadingUser}
          $width="40px"
          $height="40px"
          $radius="100%"
        >
          <Avatar $bgImg={(user && user.avatarUrl) || People} />
        </Skeleton>
      </HStack>
    </AppbarStyle>
  );
}
