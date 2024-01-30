import { useForm } from 'react-hook-form';
import useMutation from '../../../hooks/useMutation';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Stack } from '../../Stack';
import { yupResolver } from '@hookform/resolvers/yup';
import { editUserSchema } from '../../../lib/schema.validations/users';
import { InferType } from 'yup';
import { User, UserId } from '../../../lib/types';
import { toast } from 'react-toastify';
import { Loader } from '../../Loader';
import { InputError } from '../../InputError';
import { useContext } from 'react';
import { AuthContext } from '../../../context/auth.context/AuthContext';

export default function EditUserInfo({
  refetch,
  user,
}: {
  refetch: () => void;
  user?: User;
}) {
  const auth = useContext(AuthContext);
  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation(
    '/api/users',
    'patch',
    (error) => {
      switch (error?.statusCode) {
        case 404:
          toast.error('Usuário não encontrado');
          break;
        case 409:
          toast.error('Email já está em uso');
          break;
        default:
          toast.error('Erro ao atualizar usuário');
      }
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editUserSchema) });

  const onSubmit = handleSubmit(async (data) => {
    const res = await updateUser<InferType<typeof editUserSchema>, UserId>(
      data
    );

    if (res && res.userId) {
      refetch();
      auth?.refetchUser();
    }
  });

  return (
    <form onSubmit={onSubmit} style={{ marginTop: '15px' }}>
      <Stack spacing={10}>
        <Stack spacing={5}>
          <Input
            type="text"
            defaultValue={user?.name}
            placeholder="Seu nome"
            size="small"
            $hasError={errors.name && true}
            $full
            {...register('name')}
          />

          {errors.name && <InputError>{errors.name.message}</InputError>}
        </Stack>

        <Stack spacing={5}>
          <Input
            type="email"
            defaultValue={user?.email}
            placeholder="Seu email"
            size="small"
            $hasError={errors.email && true}
            $full
            {...register('email')}
          />

          {errors.email && <InputError>{errors.email.message}</InputError>}
        </Stack>

        <Button size="small" type="submit">
          {isUpdatingUser ? (
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
