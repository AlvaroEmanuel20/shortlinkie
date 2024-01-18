import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '../../hooks/auth.hooks/useAuth';
import { signUpSchema } from '../../lib/schema.validations/auth';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useState } from 'react';
import AuthLayout, {
  FormLayout,
} from '../../components/auth.components/AuthLayout';
import { Link } from 'react-router-dom';
import { Stack } from '../../components/Stack';
import { Input } from '../../components/Input';
import PasswordInputWrapper from '../../components/PasswordInputWrapper';
import { Button } from '../../components/Button';
import { GoogleButton } from '../../components/auth.components/GoogleButton';
import { InputError } from '../../components/InputError';
import { Loader } from '../../components/Loader';

const SignUpForm = styled(FormLayout)`
  .form-content {
    hr {
      margin: 25px 0;
      border: 1px solid ${(props) => props.theme.colors.gray1};
    }
  }
`;

export default function SignUp() {
  const { signUp, loadingSignUp } = useAuth();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  const onSubmit = handleSubmit((data) => signUp(data));

  return (
    <AuthLayout>
      <SignUpForm>
        <div className="form-header">
          <h1>Cadastro</h1>

          <p>
            Já tem uma conta? <Link to="/entrar">Entrar.</Link>
          </p>
        </div>

        <div className="form-content">
          <form onSubmit={onSubmit}>
            <Stack spacing={20}>
              <Stack spacing={15}>
                <Stack spacing={5}>
                  <Input
                    $hasError={errors.name && true}
                    $full
                    type="text"
                    placeholder="Nome"
                    {...register('name')}
                  />

                  {errors.name && (
                    <InputError>{errors.name.message}</InputError>
                  )}
                </Stack>

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
                {loadingSignUp ? (
                  <Stack $items="center">
                    <Loader
                      width="20px"
                      height="20px"
                      $borderWidth="3px"
                      color="white"
                    />
                  </Stack>
                ) : (
                  'Criar Conta'
                )}
              </Button>
            </Stack>
          </form>

          <hr />

          <GoogleButton $full>
            <img src="/auth/google-icon.svg" alt="Ícone do Google" />
            Entrar com Google
          </GoogleButton>
        </div>
      </SignUpForm>
    </AuthLayout>
  );
}
