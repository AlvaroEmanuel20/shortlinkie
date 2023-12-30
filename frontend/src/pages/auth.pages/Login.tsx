import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/auth.hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../lib/schema.validations/auth';
import styled from 'styled-components';
import { useState } from 'react';
import AuthLayout, {
  FormLayout,
} from '../../components/auth.components/AuthLayout';
import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import PasswordInputWrapper from '../../components/PasswordInputWrapper';
import { Button } from '../../components/Button';
import { GoogleButton } from '../../components/auth.components/GoogleButton';
import { Stack } from '../../components/Stack';
import { InputError } from '../../components/InputError';
import { Loader } from '../../components/Loader';

const LoginForm = styled(FormLayout)`
  .form-content {
    hr {
      margin: 25px 0;
      border: 1px solid ${(props) => props.theme.colors.gray1};
    }

    .google-btn {
      margin-bottom: 25px;
    }
  }
`;

export default function Login() {
  const { login, loadingLogin } = useAuth();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = handleSubmit((data) => login(data));

  return (
    <AuthLayout>
      <LoginForm>
        <div className="form-header">
          <h1>Login</h1>

          <p>
            Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se.</Link>
          </p>
        </div>

        <div className="form-content">
          <form onSubmit={onSubmit}>
            <Stack spacing={20}>
              <Stack spacing={15}>
                <Stack spacing={5}>
                  <Input
                    $hasError={errors.email && true}
                    $full
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                  />

                  {errors.email && (
                    <InputError>{errors.email.message}</InputError>
                  )}
                </Stack>

                <Stack spacing={5}>
                  <PasswordInputWrapper setShow={setShowPass} show={showPass}>
                    <Input
                      $hasError={errors.password && true}
                      $isPassword
                      type={showPass ? 'text' : 'password'}
                      placeholder="Senha"
                      $full
                      {...register('password')}
                    />
                  </PasswordInputWrapper>

                  {errors.password && (
                    <InputError>{errors.password.message}</InputError>
                  )}
                </Stack>
              </Stack>

              <Button type="submit" $full>
                {loadingLogin ? (
                  <Stack $items="center">
                    <Loader
                      width="20px"
                      height="20px"
                      $borderWidth="3px"
                      color="white"
                    />
                  </Stack>
                ) : (
                  'Entrar'
                )}
              </Button>
            </Stack>
          </form>

          <hr />

          <GoogleButton className="google-btn" $full>
            <img src="/auth/google-icon.svg" alt="Ícone do Google" />
            Entrar com Google
          </GoogleButton>

          <p>
            Esqueceu a senha? <Link to="/recuperar-senha">Recuperar.</Link>
          </p>
        </div>
      </LoginForm>
    </AuthLayout>
  );
}
