import { useForm } from 'react-hook-form';
import useMutation from '../../../hooks/useMutation';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Loader } from '../../Loader';
import { Stack } from '../../Stack';
import AddSrcInputWrapper from '../AddSrcInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { addShorturlSchema } from '../../../lib/schema.validations/shorturls';
import { InferType } from 'yup';
import { ShortId } from '../../../lib/types';
import { toast } from 'react-toastify';
import { InputError } from '../../InputError';

export default function AddShorturlForm({ refetch }: { refetch: () => void }) {
  const { mutate: mutateShorturls, isLoading: isSubmitingShorturl } =
    useMutation('/shorturls', 'post', (error) => {
      if (error) toast.error('Erro ao cadastrar link');
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addShorturlSchema) });

  const onSubmit = handleSubmit(async (data) => {
    const res = await mutateShorturls<
      InferType<typeof addShorturlSchema>,
      ShortId
    >(data);

    if (res && res.shortId) refetch();
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={15}>
        <Stack spacing={5}>
          <Input
            type="text"
            $hasError={errors.title && true}
            placeholder="Título do link"
            size="small"
            $full
            {...register('title')}
          />

          {errors.title && <InputError>{errors.title.message}</InputError>}
        </Stack>

        <Stack spacing={5}>
          <AddSrcInputWrapper>
            <Input
              type="text"
              $hasError={errors.src && true}
              placeholder="Adicione uma origem"
              size="small"
              $full
              {...register('src')}
            />
          </AddSrcInputWrapper>

          {errors.src && <InputError>{errors.src.message}</InputError>}
        </Stack>

        <Stack spacing={5}>
          <Input
            type="url"
            $hasError={errors.originalUrl && true}
            placeholder="Link original"
            size="small"
            $full
            {...register('originalUrl')}
          />

          {errors.originalUrl && (
            <InputError>{errors.originalUrl.message}</InputError>
          )}
        </Stack>

        <Button type="submit" $full size="small">
          {isSubmitingShorturl ? (
            <Stack $items="center">
              <Loader
                width="20px"
                height="20px"
                $borderWidth="3px"
                color="white"
              />
            </Stack>
          ) : (
            'Adicionar'
          )}
        </Button>
      </Stack>
    </form>
  );
}
