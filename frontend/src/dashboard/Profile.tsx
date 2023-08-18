import { styled, useTheme } from 'styled-components';
import { Loader } from '../components/Loader';
import { useContext } from 'react';
import { AuthContext } from '../auth/context/AuthContext';
import { HStack } from '../components/HStack';
import { Avatar } from './components/Avatar';
import People from '../assets/people.jpg';
import { Stack } from '../components/Stack';
import { Label } from '../components/Label';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const ProfilePage = styled.main`
  width: 600px;
  margin: 0 auto;

  h1 {
    font-size: ${(props) => props.theme.fontSize.lg};
    margin-bottom: 30px;
  }
`;

export default function Profile() {
  const theme = useTheme();
  const auth = useContext(AuthContext);

  if (!auth || !auth.user) {
    return (
      <ProfilePage>
        <Loader color={theme.colors.orange1} />
      </ProfilePage>
    );
  }

  return (
    <ProfilePage>
      <h1>Configurações de perfil</h1>

      <HStack $spacing={15}>
        <Avatar $bgImg={auth.user.avatarUrl || People} />

        <Stack>
          <p style={{ fontWeight: 'bold' }}>{auth.user.name}</p>
          <p>{auth.user.email}</p>
        </Stack>
      </HStack>

      <form style={{ marginTop: '20px' }}>
        <Stack $spacing={20}>
          <Stack $spacing={5}>
            <Label>Nome</Label>
            <Input type="text" placeholder={auth.user.name} />
          </Stack>

          <Stack $spacing={5}>
            <Label>Email</Label>
            <Input type="email" placeholder={auth.user.email} />
          </Stack>

          <Stack $spacing={5}>
            <Label>Senha</Label>
            <Input type="password" placeholder="Sua nova senha" />
          </Stack>

          <Stack $spacing={5}>
            <Label>Confirme sua senha</Label>
            <Input type="password" placeholder="Confirme sua nova senha" />
          </Stack>

          <Button type="submit">Atualizar</Button>
        </Stack>
      </form>
    </ProfilePage>
  );
}
