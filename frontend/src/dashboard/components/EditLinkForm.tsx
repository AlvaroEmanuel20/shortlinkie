import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Stack } from '../../components/Stack';
import { yupResolver } from '@hookform/resolvers/yup';
import { editLinkSchema } from '../../lib/validations/link';
import { InputError } from '../../components/InputError';
import useMutation from '../../hooks/useMutation';
import { ShortId } from '../../lib/interfaces';
import { Loader } from '../../components/Loader';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface EditLinkData {
  title?: string;
  originalUrl?: string;
  shortId?: string;
}

interface EditLinkForm {
  shortId: string;
  title: string;
  originalUrl: string;
  refetch: () => void;
}

export default function EditLinkForm({
  shortId,
  title,
  originalUrl,
  refetch,
}: EditLinkForm) {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditLinkData>({
    defaultValues: {
      shortId,
      title,
      originalUrl,
    },
    resolver: yupResolver<EditLinkData>(editLinkSchema),
  });

  const { mutate, isLoading, error } = useMutation(`/${shortId}`, 'patch');
  const onSubmit = handleSubmit(async (data) => {
    const res = await mutate<EditLinkData, ShortId>(data);
    if (res && res.shortId) {
      refetch();
    }

    navigate('/');
  });

  useEffect(() => {
    if (error) {
      toast.error('Erro ao atualizar link');
    }
  }, [error]);

  return (
    <form onSubmit={onSubmit}>
      <Stack $spacing={15}>
        <Stack $spacing={10}>
          <Stack $spacing={5}>
            <Label htmlFor="title">Título</Label>

            <Input
              type="text"
              id="title"
              placeholder={title}
              {...register('title')}
            />

            {errors.title && <InputError>{errors.title.message}</InputError>}
          </Stack>

          <Stack $spacing={5}>
            <Label htmlFor="originalUrl">Link</Label>

            <Input
              type="url"
              id="originalUrl"
              placeholder={originalUrl}
              {...register('originalUrl')}
            />

            {errors.originalUrl && (
              <InputError>{errors.originalUrl.message}</InputError>
            )}
          </Stack>

          <Stack $spacing={5}>
            <Label htmlFor="shortId">Texto do link</Label>

            <Input
              type="text"
              id="shortId"
              placeholder={shortId}
              {...register('shortId')}
            />

            {errors.shortId && (
              <InputError>{errors.shortId.message}</InputError>
            )}
          </Stack>
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
  );
}
