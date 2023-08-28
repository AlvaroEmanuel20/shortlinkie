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
import { Loader } from '../../components/Loader';
import useQrCode from '../hooks/useQrCode';

interface AddQrForm {
  shortUrls: ShortUrl[];
}

export default function AddQrForm({ shortUrls }: AddQrForm) {
  const theme = useTheme();
  const { qrCode, setQrCode, downloadQrCode, downloading, qrCodeRef } =
    useQrCode();

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
