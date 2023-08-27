import { QRCodeSVG } from 'qrcode.react';
import { Button } from '../../components/Button';
import { Label } from '../../components/Label';
import { Stack } from '../../components/Stack';
import { useTheme } from 'styled-components';
import { HStack } from '../../components/HStack';
import { Select } from '../../components/Select';
import { ShortUrl } from '../../lib/interfaces';
import { useForm } from 'react-hook-form';
import { InputError } from '../../components/InputError';
import { ReactNode, useRef, useState } from 'react';
import * as htmlToImg from 'html-to-image';
import { toast } from 'react-toastify';
import { Loader } from '../../components/Loader';

interface AddQrForm {
  shortUrls: ShortUrl[];
}

export default function AddQrForm({ shortUrls }: AddQrForm) {
  const theme = useTheme();
  const [qrCode, setQrCode] = useState<ReactNode>();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ link: string }>();
  const onSubmit = handleSubmit((data) => {
    setQrCode(
      <QRCodeSVG
        value={`${data.link}?src=qrcode`}
        fgColor={theme.colors.orange1}
      />
    );
  });

  const downloadQrCode = () => {
    setDownloading(true);

    if (qrCodeRef.current === null) {
      return;
    }

    htmlToImg
      .toPng(qrCodeRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qrcode_encurtando.png';
        link.click();

        setDownloading(false);
      })
      .catch(() => {
        toast.error('Erro ao baixar QR Code');
        setDownloading(false);
      });
  };

  return (
    <>
      {!qrCode && (
        <form onSubmit={onSubmit}>
          <Stack $spacing={15}>
            <Stack $spacing={5}>
              <Label htmlFor="select">Selecione o link encurtado</Label>

              <Select
                defaultValue={
                  `http://localhost:3002/${shortUrls[0].shortId}` || ''
                }
                {...register('link', { required: true })}
                disabled={shortUrls.length === 0}
              >
                {shortUrls.map((shortUrl) => (
                  <option
                    key={shortUrl.shortId}
                    value={`http://localhost:3002/${shortUrl.shortId}`}
                  >{`http://localhost:3002/${shortUrl.shortId}`}</option>
                ))}
              </Select>

              {errors.link && <InputError>{errors.link.message}</InputError>}
            </Stack>

            <Button type="submit">Gerar</Button>
          </Stack>
        </form>
      )}

      {qrCode && (
        <HStack $spacing={15}>
          <div style={{ display: 'flex' }} ref={qrCodeRef}>
            {qrCode}
          </div>

          <Stack $spacing={10} style={{ width: '100%' }}>
            <Button onClick={downloadQrCode}>
              {downloading ? (
                <Loader
                  $width="20px"
                  $height="20px"
                  $borderWidth="3px"
                  color={theme.colors.white}
                />
              ) : (
                'Download'
              )}
            </Button>

            <Button type="button" onClick={() => setQrCode(null)}>
              Voltar
            </Button>
          </Stack>
        </HStack>
      )}
    </>
  );
}
