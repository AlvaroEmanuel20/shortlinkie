import { useForm } from 'react-hook-form';
import useMutation from '../../../hooks/useMutation';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { InputError } from '../../InputError';
import { Loader } from '../../Loader';
import { Queue } from '../../Queue';
import { Stack } from '../../Stack';
import { yupResolver } from '@hookform/resolvers/yup';
import { editQrconfigSchema } from '../../../lib/schema.validations/qrconfig';
import { toast } from 'react-toastify';
import { InferType } from 'yup';
import { QrConfig, QrConfigId } from '../../../lib/types';
import styled from 'styled-components';

const EditQrconfigFormStyles = styled.form`
  @media (max-width: 500px) {
    .qr-color-size {
      flex-direction: column;
    }
  }
`;

export default function EditQrconfigForm({
  refetch,
  qrConfig,
}: {
  refetch: () => void;
  qrConfig?: QrConfig;
}) {
  const { mutate: updateQrConfig, isLoading: isUpdatingQrConfig } = useMutation(
    '/api/qrconfig',
    'patch',
    (error) => {
      if (error?.statusCode === 404) {
        toast.error('Configurações de QR Code não encontrada.');
      } else {
        toast.error('Erro ao atualizar as configurações de QR Code.');
      }
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editQrconfigSchema) });

  const onSubmit = handleSubmit(async (data) => {
    const res = await updateQrConfig<
      InferType<typeof editQrconfigSchema>,
      QrConfigId
    >(data);

    if (res && res.configId) refetch();
  });

  return (
    <EditQrconfigFormStyles onSubmit={onSubmit} style={{ marginTop: '15px' }}>
      <Stack spacing={15}>
        <Queue className="qr-color-size" spacing={10}>
          <Stack style={{ width: '100%' }} spacing={5}>
            <Input
              size="small"
              type="text"
              placeholder="Cor em hexadecimal"
              defaultValue={qrConfig?.color}
              $hasError={errors.color && true}
              $full
              {...register('color')}
            />

            {errors.color && <InputError>{errors.color.message}</InputError>}
          </Stack>

          <Stack style={{ width: '100%' }} spacing={5}>
            <Input
              defaultValue={qrConfig?.size}
              $hasError={errors.size && true}
              size="small"
              type="number"
              placeholder="Tamanho"
              $full
              {...register('size')}
            />

            {errors.size && <InputError>{errors.size.message}</InputError>}
          </Stack>
        </Queue>

        <Button type="submit" size="small">
          {isUpdatingQrConfig ? (
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
    </EditQrconfigFormStyles>
  );
}
