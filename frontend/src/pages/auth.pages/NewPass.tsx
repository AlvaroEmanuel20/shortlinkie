import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/auth.hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { newPassSchema } from '../../lib/schema.validations/auth';
import { useState } from 'react';
import AuthLayout, {
  FormLayout,
} from '../../components/auth.components/AuthLayout';
import { Link, useSearchParams } from 'react-router-dom';
import { Input } from '../../components/Input';
import PasswordInputWrapper from '../../components/PasswordInputWrapper';
import { Button } from '../../components/Button';
import { Stack } from '../../components/Stack';
import { InputError } from '../../components/InputError';
import { Loader } from '../../components/Loader';

export default function NewPass() {
  const [searchParams] = useSearchParams();
  const { newPass, loadingNewPass } = useAuth();
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newPassSchema) });

  const onSubmit = handleSubmit((data) =>
    newPass(data, searchParams.get('token') || '')
  );

  return (
    <AuthLayout>
      <FormLayout>
        <div className="form-header">
          <h1>Nova Senha</h1>

          <p>
            Lembrou a senha? <Link to="/entrar">Entrar.</Link>
          </p>
        </div>

        <div className="form-content">
          <form onSubmit={onSubmit}>
            <Stack spacing={20}>
              <Stack spacing={15}>
                <Stack spacing={5}>
                  <PasswordInputWrapper setShow={setShowPass1} show={showPass1}>
                    <Input
                      $hasError={errors.newPassword && true}
                      $isPassword
                      type={showPass1 ? 'text' : 'password'}
                      placeholder="Senha"
                      $full
                      {...register('newPassword')}
                    />
                  </PasswordInputWrapper>

                  {errors.newPassword && (
                    <InputError>{errors.newPassword.message}</InputError>
                  )}
                </Stack>

                <Stack spacing={5}>
                  <PasswordInputWrapper setShow={setShowPass2} show={showPass2}>
                    <Input
                      $hasError={errors && true}
                      $isPassword
                      type={showPass2 ? 'text' : 'password'}
                      placeholder="Digite novamente a senha"
                      $full
                      {...register('confirmPassword')}
                    />
                  </PasswordInputWrapper>

                  {errors.confirmPassword && (
                    <InputError>{errors.confirmPassword.message}</InputError>
                  )}
                </Stack>
              </Stack>

              <Button type="submit" $full>
                {loadingNewPass ? (
                  <Stack $items="center">
                    <Loader
                      width="20px"
                      height="20px"
                      $borderWidth="3px"
                      color="white"
                    />
                  </Stack>
                ) : (
                  'Atualizar'
                )}
              </Button>
            </Stack>
          </form>
        </div>
      </FormLayout>
    </AuthLayout>
  );
}
