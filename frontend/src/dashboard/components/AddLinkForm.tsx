import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Stack } from '../../components/Stack';
import { yupResolver } from '@hookform/resolvers/yup';
import { addLinkSchema } from '../../lib/validations/link';
import { InputError } from '../../components/InputError';
import useMutation from '../../hooks/useMutation';
import { ShortId } from '../../lib/interfaces';
import { Loader } from '../../components/Loader';
import { useTheme } from 'styled-components';

interface LinkData {
  title: string;
  originalUrl: string;
}

export default function AddLinkForm({ refetchs }: { refetchs: () => void }) {
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LinkData>({ resolver: yupResolver(addLinkSchema) });

  const { mutate, isLoading } = useMutation('/', 'post');
  const onSubmit = handleSubmit(async (data) => {
    const res = await mutate<LinkData, ShortId>(data);
    if (res && res.shortId) {
      refetchs();
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack $spacing={15}>
        <Stack $spacing={10}>
          <Stack $spacing={5}>
            <Label htmlFor="title">Título</Label>

            <Input
              type="text"
              id="title"
              placeholder="Título do link"
              {...register('title')}
            />

            {errors.title && <InputError>{errors.title.message}</InputError>}
          </Stack>

          <Stack $spacing={5}>
            <Label htmlFor="originalUrl">Link</Label>

            <Input
              type="url"
              id="originalUrl"
              placeholder="Link a ser encurtado"
              {...register('originalUrl')}
            />

            {errors.originalUrl && (
              <InputError>{errors.originalUrl.message}</InputError>
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
