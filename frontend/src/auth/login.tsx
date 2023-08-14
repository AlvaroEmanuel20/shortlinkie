import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Stack } from '../components/Stack';
import AuthCard from './components/AuthCard';
import { AuthLayout } from './components/AuthLayout';
import useAuth, { LoginData } from './hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../lib/validations/auth';
import { InputError } from '../components/InputError';
import { Loader } from '../components/Loader';

export default function Login() {
  const { login, loadingLogin, loginError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: yupResolver(loginSchema) });

  const onSubmit = handleSubmit((data) => login(data));

  return (
    <AuthLayout>
      <AuthCard title="Login" linkText="Cadastro" linkTo="/cadastro">
        <form onSubmit={onSubmit}>
          <Stack $spacing={20}>
            <Stack $spacing={15}>
              <Stack $spacing={5}>
                <Label htmlFor="email">Email</Label>

                <Input
                  type="email"
                  id="email"
                  placeholder="Seu email"
                  {...register('email')}
                />

                {errors.email && (
                  <InputError>{errors.email.message}</InputError>
                )}
              </Stack>

              <Stack $spacing={5}>
                <Label htmlFor="password">Senha</Label>

                <Input
                  type="password"
                  id="password"
                  placeholder="Sua senha"
                  {...register('password')}
                />

                {errors.password && (
                  <InputError>{errors.password.message}</InputError>
                )}
              </Stack>
            </Stack>

            <Button type="submit">
              {loadingLogin ? (
                <Loader $width="20px" $height="20px" $borderWidth="3px" />
              ) : (
                'Entrar'
              )}
            </Button>
          </Stack>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
