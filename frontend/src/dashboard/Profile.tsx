import { styled, useTheme } from 'styled-components';
import { Loader } from '../components/Loader';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/context/AuthContext';
import { HStack } from '../components/HStack';
import { Avatar } from './components/Avatar';
import People from '../assets/people.jpg';
import { Stack } from '../components/Stack';
import { Label } from '../components/Label';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useForm } from 'react-hook-form';
import useMutation from '../hooks/useMutation';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserId } from '../lib/interfaces';
import { InputError } from '../components/InputError';
import { editPasswordSchema, editUserSchema } from '../lib/validations/users';
import { toast } from 'react-toastify';

const ProfilePage = styled.main`
  width: 600px;
  margin: 0 auto;

  h1 {
    font-size: ${(props) => props.theme.fontSize.lg};
  }
`;

interface FormProfile {
  name?: string;
  email?: string;
}

interface FormPassword {
  password?: string;
  confirmPassword?: string;
}

export default function Profile() {
  const theme = useTheme();
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProfile>({
    defaultValues: {
      name: auth?.user?.name,
      email: auth?.user?.email,
    },
    resolver: yupResolver<FormProfile>(editUserSchema),
  });

  const { mutate, isLoading, error } = useMutation('/api/users', 'patch');
  const onSubmit = handleSubmit((data) => mutate<FormProfile, UserId>(data));

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm<FormPassword>({
    resolver: yupResolver<FormPassword>(editPasswordSchema),
  });

  const {
    mutate: mutatePassword,
    isLoading: isLoadingPassword,
    error: errorPassword,
  } = useMutation('/api/users', 'patch');

  const onSubmitPassword = handleSubmitPassword((data) =>
    mutatePassword<FormPassword, UserId>(data)
  );

  useEffect(() => {
    if (error) {
      toast.error('Erro ao atualizar perfil');
    }

    if (errorPassword) {
      toast.error('Erro ao atualizar senha');
    }
  }, [error, errorPassword]);

  if (!auth || !auth.user) {
    return (
      <ProfilePage>
        <Loader color={theme.colors.orange1} />
      </ProfilePage>
    );
  }

  return (
    <ProfilePage>
      <h1 style={{ marginBottom: '20px' }}>Configurações de perfil</h1>

      <HStack $spacing={15}>
        <Avatar $bgImg={auth.user.avatarUrl || People} />

        <Stack>
          <p style={{ fontWeight: 'bold' }}>{auth.user.name}</p>
          <p>{auth.user.email}</p>
        </Stack>
      </HStack>

      <form onSubmit={onSubmit} style={{ marginTop: '20px' }}>
        <Stack $spacing={20}>
          <Stack $spacing={5}>
            <Label htmlFor="name">Nome</Label>

            <Input
              type="text"
              id="name"
              placeholder={auth.user.name}
              {...register('name')}
            />

            {errors.name && <InputError>{errors.name.message}</InputError>}
          </Stack>

          <Stack $spacing={5}>
            <Label htmlFor="email">Email</Label>

            <Input
              type="email"
              id="email"
              placeholder={auth.user.email}
              {...register('email')}
            />

            {errors.email && <InputError>{errors.email.message}</InputError>}
          </Stack>

          <Button type="submit">
            {isLoading ? (
              <Loader
                $width="20px"
                $height="20px"
                $borderWidth="3px"
                color={theme.colors.white}
              />
            ) : (
              'Atualizar'
            )}
          </Button>
        </Stack>
      </form>

      <h1 style={{ marginTop: '30px', marginBottom: '20px' }}>
        Atualizar senha
      </h1>

      <form onSubmit={onSubmitPassword}>
        <Stack $spacing={20}>
          <Stack $spacing={5}>
            <Label htmlFor="password">Senha</Label>

            <Input
              type="password"
              id="password"
              placeholder="Sua nova senha"
              {...registerPassword('password')}
            />

            {errorsPassword.password && (
              <InputError>{errorsPassword.password.message}</InputError>
            )}
          </Stack>

          <Stack $spacing={5}>
            <Label htmlFor="confirmPassword">Confirme sua senha</Label>

            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirme sua nova senha"
              {...registerPassword('confirmPassword')}
            />

            {errorsPassword.confirmPassword && (
              <InputError>{errorsPassword.confirmPassword.message}</InputError>
            )}
          </Stack>

          <Button type="submit">
            {isLoadingPassword ? (
              <Loader
                $width="20px"
                $height="20px"
                $borderWidth="3px"
                color={theme.colors.white}
              />
            ) : (
              'Atualizar'
            )}
          </Button>
        </Stack>
      </form>
    </ProfilePage>
  );
}
