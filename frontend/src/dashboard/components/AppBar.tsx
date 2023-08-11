import { styled } from 'styled-components';
import { HStack } from '../../components/HStack';
import { Input } from '../../components/Input';
import { Avatar } from './Avatar';
import People from '../../assets/people.jpg';

const AppbarStyle = styled.header`
  margin-bottom: 30px;
`;

export default function Appbar() {
  return (
    <AppbarStyle>
      <HStack $spacing={20} $justify="space-between">
        <Input
          type="search"
          placeholder="Pesquisar"
          style={{ minWidth: 380 }}
        />

        <Avatar bgImg={People} />
      </HStack>
    </AppbarStyle>
  );
}
