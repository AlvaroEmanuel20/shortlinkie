import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Stack } from '../components/Stack';
import AuthCard from './components/AuthCard';
import { AuthLayout } from './components/AuthLayout';
import useAuth, { SignUpData } from './hooks/useAuth';
import { signUpSchema } from '../lib/validations/auth';
import { useForm } from 'react-hook-form';
import { InputError } from '../components/InputError';
import { Loader } from '../components/Loader';

export default function SignUp() {
  const { signUp, loadingSignUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({ resolver: yupResolver(signUpSchema) });

  const onSubmit = handleSubmit((data) => signUp(data));

  return (
    <AuthLayout>
      <AuthCard title="Cadastro" linkText="Login" linkTo="/login">
        <form onSubmit={onSubmit}>
          <Stack $spacing={20}>
            <Stack $spacing={15}>
              <Stack $spacing={5}>
                <Label htmlFor="name">Nome</Label>

                <Input
                  type="text"
                  id="name"
                  placeholder="Seu nome"
                  {...register('name')}
                />

                {errors.name && <InputError>{errors.name.message}</InputError>}
              </Stack>

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
              {loadingSignUp ? (
                <Loader $width="20px" $height="20px" $borderWidth="3px" />
              ) : (
                'Cadastrar'
              )}
            </Button>
          </Stack>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
