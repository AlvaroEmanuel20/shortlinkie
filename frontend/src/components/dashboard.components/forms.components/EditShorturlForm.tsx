import styled from 'styled-components';
import { ShortId, ShortUrl } from '../../../lib/types';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Stack } from '../../Stack';
import AddSrcInputWrapper from '../AddSrcInput';
import useMutation from '../../../hooks/useMutation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { editShorturlSchema } from '../../../lib/schema.validations/shorturls';
import { InferType } from 'yup';
import { Loader } from '../../Loader';
import { InputError } from '../../InputError';
import { useNavigate } from 'react-router-dom';

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.gray1};
  border-radius: ${(props) => props.theme.radius.base};
  padding-right: 15px;

  .domain {
    padding: 10px 15px;
    border-radius: ${(props) => props.theme.radius.base};
    background-color: ${(props) => props.theme.colors.light};
    font-size: ${(props) => props.theme.fontSize.small};
    color: ${(props) => props.theme.colors.gray1};
  }
`;

export default function EditShorturlForm({
  shorturl,
}: {
  shorturl?: ShortUrl;
}) {
  const navigate = useNavigate();
  const { mutate: editShorturl, isLoading: isEditingShorturl } = useMutation(
    `/shorturls/${shorturl?.shortId}`,
    'patch',
    (error) => {
      if (error?.statusCode === 404) {
        toast.error('Link não encontrado');
      } else if (error?.statusCode === 409) {
        toast.error(`Esse ID já está sendo usado`);
      } else {
        toast.error('Erro ao cadastrar link');
      }
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editShorturlSchema) });

  const onSubmit = handleSubmit(async (data) => {
    delete data.src;
    const res = await editShorturl<
      InferType<typeof editShorturlSchema>,
      ShortId
    >(data);

    if (res && res.shortId) navigate('/');
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={15}>
        <Stack spacing={5}>
          <Input
            type="text"
            placeholder="Título do link"
            size="small"
            $hasError={errors.title && true}
            defaultValue={shorturl?.title}
            $full
            {...register('title')}
          />

          {errors.title && <InputError>{errors.title.message}</InputError>}
        </Stack>

        <Stack spacing={5}>
          <Input
            type="url"
            placeholder="Link original"
            size="small"
            $hasError={errors.originalUrl && true}
            defaultValue={shorturl?.originalUrl}
            $full
            {...register('originalUrl')}
          />

          {errors.originalUrl && (
            <InputError>{errors.originalUrl.message}</InputError>
          )}
        </Stack>

        <Stack spacing={5}>
          <AddSrcInputWrapper tooltipPosition="left">
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
          <InputGroup>
            <span className="domain">https://encurt.com/</span>

            <Input
              type="text"
              placeholder="ID do link"
              $hasError={errors.shortId && true}
              style={{ border: 'none', padding: 0, margin: 0 }}
              defaultValue={shorturl?.shortId}
              $full
              {...register('shortId')}
            />
          </InputGroup>

          {errors.shortId && <InputError>{errors.shortId.message}</InputError>}
        </Stack>

        <Button type="submit" $full size="small">
          {isEditingShorturl ? (
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
