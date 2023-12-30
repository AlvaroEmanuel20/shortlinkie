import { useState } from 'react';
import { Button } from '../../Button';
import { Input } from '../../Input';
import PasswordInputWrapper from '../../PasswordInputWrapper';
import { Stack } from '../../Stack';
import useMutation from '../../../hooks/useMutation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InferType } from 'yup';
import { UserId } from '../../../lib/types';
import { editPasswordSchema } from '../../../lib/schema.validations/users';
import { toast } from 'react-toastify';
import { InputError } from '../../InputError';
import { Loader } from '../../Loader';

export default function EditPassForm() {
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [showPass3, setShowPass3] = useState(false);

  const { mutate: updatePass, isLoading: isUpdatingPass } = useMutation(
    '/api/users',
    'patch',
    (error) => {
      switch (error?.statusCode) {
        case 404:
          toast.error('Usuário não encontrado');
          break;
        default:
          toast.error('Erro ao atualizar senha');
      }
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editPasswordSchema) });

  const onSubmit = handleSubmit(async (data) => {
    const res = await updatePass<InferType<typeof editPasswordSchema>, UserId>(
      data
    );

    if (res && res.userId) toast.success('Senha atualizada');
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <PasswordInputWrapper setShow={setShowPass1} show={showPass1}>
            <Input
              $hasError={errors.password && true}
              $isPassword
              size="small"
              type={showPass1 ? 'text' : 'password'}
              placeholder="Senha atual"
              $full
              {...register('password')}
            />
          </PasswordInputWrapper>

          {errors.password && (
            <InputError>{errors.password.message}</InputError>
          )}
        </Stack>

        <Stack spacing={5}>
          <PasswordInputWrapper setShow={setShowPass2} show={showPass2}>
            <Input
              $hasError={errors.newPassword && true}
              $isPassword
              size="small"
              type={showPass2 ? 'text' : 'password'}
              placeholder="Nova senha"
              $full
              {...register('newPassword')}
            />
          </PasswordInputWrapper>

          {errors.newPassword && (
            <InputError>{errors.newPassword.message}</InputError>
          )}
        </Stack>

        <Stack spacing={5}>
          <PasswordInputWrapper setShow={setShowPass3} show={showPass3}>
            <Input
              $hasError={errors.confirmPassword && true}
              $isPassword
              size="small"
              type={showPass3 ? 'text' : 'password'}
              placeholder="Digite novamente a nova senha"
              $full
              {...register('confirmPassword')}
            />
          </PasswordInputWrapper>

          {errors.confirmPassword && (
            <InputError>{errors.confirmPassword.message}</InputError>
          )}
        </Stack>

        <Button size="small" type="submit">
          {isUpdatingPass ? (
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
  );
}
