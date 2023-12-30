import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/auth.hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPassSchema } from '../../lib/schema.validations/auth';
import AuthLayout, {
  FormLayout,
} from '../../components/auth.components/AuthLayout';
import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Stack } from '../../components/Stack';
import { InputError } from '../../components/InputError';
import { Loader } from '../../components/Loader';
import { useState } from 'react';
import styled from 'styled-components';
import { Queue } from '../../components/Queue';
import { CheckCircle2 } from 'lucide-react';
import { fadeIn } from '../../components/animations/fadeIn';

const SuccessMessageStyles = styled.div`
  animation: ${fadeIn} 1s ease-out;

  p {
    font-size: ${(props) => props.theme.fontSize.base};
  }
`;

export default function ResetPass() {
  const { resetPass, loadingResetPass } = useAuth();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPassSchema) });

  const onSubmit = handleSubmit(async (data) => {
    const result = await resetPass(data);
    if (result) setSuccess(true);
  });

  if (success) {
    return (
      <AuthLayout>
        <FormLayout>
          <div className="form-header">
            <h1>Recuperar Senha</h1>

            <p>
              Lembrou a senha? <Link to="/entrar">Entrar.</Link>
            </p>
          </div>

          <SuccessMessageStyles>
            <Queue spacing={15}>
              <CheckCircle2 size={40} />
              <p>
                Enviamos um email para você com as instruções para recuperar a
                senha.
              </p>
            </Queue>
          </SuccessMessageStyles>
        </FormLayout>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <FormLayout>
        <div className="form-header">
          <h1>Recuperar Senha</h1>

          <p>
            Lembrou a senha? <Link to="/entrar">Entrar.</Link>
          </p>
        </div>

        <div className="form-content">
          <form onSubmit={onSubmit}>
            <Stack spacing={20}>
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

              <Button type="submit" $full>
                {loadingResetPass ? (
                  <Stack $items="center">
                    <Loader
                      width="20px"
                      height="20px"
                      $borderWidth="3px"
                      color="white"
                    />
                  </Stack>
                ) : (
                  'Recuperar'
                )}
              </Button>
            </Stack>
          </form>
        </div>
      </FormLayout>
    </AuthLayout>
  );
}
