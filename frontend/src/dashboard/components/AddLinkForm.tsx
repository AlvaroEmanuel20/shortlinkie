import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Stack } from '../../components/Stack';
import { yupResolver } from '@hookform/resolvers/yup';
import { addLinkSchema } from '../../lib/validations/link';
import { InputError } from '../../components/InputError';

interface LinkData {
  title: string;
  originalUrl: string;
}

export default function AddLinkForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LinkData>({ resolver: yupResolver(addLinkSchema) });

  const onSubmit = handleSubmit((data) => console.log(data));

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

        <Button>Adicionar</Button>
      </Stack>
    </form>
  );
}
