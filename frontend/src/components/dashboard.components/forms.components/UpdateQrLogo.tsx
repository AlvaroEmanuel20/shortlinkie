import { FormEvent, useRef, useState } from 'react';
import { Stack } from '../../Stack';
import { Queue } from '../../Queue';
import { PhotoUpload } from '../PhotoUpload';
import Skeleton from '../Skeleton';
import { Avatar } from '../Avatar';
import { Upload } from 'lucide-react';
import { Button } from '../../Button';
import { useTheme } from 'styled-components';
import { QrConfig } from '../../../lib/types';
import useMutation from '../../../hooks/useMutation';
import { Loader } from '../../Loader';
import { toast } from 'react-toastify';

type UpdateQrLogo = {
  isLoadingQrConfig: boolean;
  qrConfig?: { qrConfig: QrConfig; logoPresignedUrl?: string };
  refetch: () => void;
};

export default function UpdateQrLogo({
  isLoadingQrConfig,
  qrConfig,
  refetch,
}: UpdateQrLogo) {
  const theme = useTheme();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileSelected, setFileSelected] = useState<FileList | null>();

  const { mutate, isLoading } = useMutation(
    '/api/qrconfig/logo',
    'put',
    (error) => {
      if (error) toast.error('Erro ao enviar nova logo');
    },
    true
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileSelected || !fileSelected[0]) return;

    const formData = new FormData();
    formData.append('logo', fileSelected[0]);

    const res = await mutate<FormData, { logoId: string }>(formData);
    if (res && res.logoId) refetch();
  };

  return (
    <Stack style={{ marginTop: '20px' }} spacing={15}>
      <p>Adicione uma logo aos seus QR Codes:</p>

      <form onSubmit={onSubmit} encType="multipart/form-data">
        <Queue spacing={10} $justify="space-between">
          <PhotoUpload onClick={() => inputFileRef.current?.click()}>
            <div className="avatar-abs">
              <Skeleton
                isLoading={isLoadingQrConfig}
                width="45px"
                height="45px"
                radius="100%"
              >
                {!isLoadingQrConfig && qrConfig ? (
                  <Avatar
                    $bgImg={
                      qrConfig.logoPresignedUrl ? qrConfig.logoPresignedUrl : ''
                    }
                  />
                ) : (
                  <Avatar $bgImg="" />
                )}
              </Skeleton>
            </div>

            <Queue spacing={10}>
              <p style={{ fontSize: theme.fontSize.small }}>
                {fileSelected ? fileSelected[0].name : 'Carregar nova logo'}
              </p>
              <Upload size={15} color={theme.colors.blue2} />
            </Queue>
          </PhotoUpload>

          <Button size="small" type="submit">
            {isLoading ? (
              <Stack $items="center">
                <Loader
                  width="20px"
                  height="20px"
                  $borderWidth="3px"
                  color="white"
                />
              </Stack>
            ) : (
              'Enviar'
            )}
          </Button>

          <input
            ref={inputFileRef}
            onChange={(e) => setFileSelected(e.target.files)}
            type="file"
            name="qrcode_logo"
            id="qrcode_logo"
            hidden
          />
        </Queue>
      </form>
    </Stack>
  );
}
