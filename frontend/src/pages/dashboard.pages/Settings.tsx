import styled, { useTheme } from 'styled-components';
import { Card } from '../../components/dashboard.components/Card';
import { Stack } from '../../components/Stack';
import { Button } from '../../components/Button';
import PhotoUpload from '../../components/dashboard.components/PhotoUpload';
import { QRCodeSVG } from 'qrcode.react';
import useQuery from '../../hooks/useQuery';
import { QrConfig, User } from '../../lib/types';
import { toast } from 'react-toastify';
import Skeleton from '../../components/dashboard.components/Skeleton';
import EditQrconfigForm from '../../components/dashboard.components/forms.components/EditQrconfigForm';
import EditUserInfo from '../../components/dashboard.components/forms.components/EditUserInfo';
import EditPassForm from '../../components/dashboard.components/forms.components/EditPassForm';
import useMutation from '../../hooks/useMutation';
import { Loader } from '../../components/Loader';

const SettingsStyles = styled.div`
  padding-bottom: 45px;
  display: grid;
  grid-template-columns: 530px 1fr;
  gap: 20px;
  height: auto;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }

  h2 {
    font-size: ${(props) => props.theme.fontSize.medium};
  }

  hr {
    border: 1px solid ${(props) => props.theme.colors.gray1};
    margin: 30px 0;
  }
`;

export default function Settings() {
  const theme = useTheme();

  const {
    data: qrConfig,
    isLoading: isLoadingQrConfig,
    refetch: refetchQrConfig,
  } = useQuery<QrConfig>('/api/qrconfig', (error) => {
    if (error?.statusCode === 404) {
      toast.error('Configurações de QR Code não encontrada.');
    } else {
      toast.error('Erro ao carregar as configurações de QR Code.');
    }
  });

  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useQuery<User>('/api/users', (error) => {
    if (error?.statusCode === 404) {
      toast.error('Usuário não encontrado.');
    } else {
      toast.error('Erro ao carregar informações do usuário');
    }
  });

  const { mutate: newVerifyEmail, isLoading: isSendingNewVerifyEmail } =
    useMutation('/api/users/newverify', 'patch', (error) => {
      if (error) toast.error('Erro ao gerar novo email');
    });

  return (
    <SettingsStyles>
      <Skeleton isLoading={isLoadingQrConfig}>
        <Card>
          <h2>Preferências de QR Code</h2>
          <EditQrconfigForm refetch={refetchQrConfig} qrConfig={qrConfig} />

          <Stack style={{ marginTop: '20px' }} spacing={15}>
            <p>Adicione uma logo aos seus QR Codes:</p>
            <PhotoUpload text="Carregar nova logo" />
          </Stack>

          <hr />

          <Stack spacing={30}>
            <p>Pré-visualização:</p>

            <QRCodeSVG
              style={{ alignSelf: 'center' }}
              value={'https://picturesofpeoplescanningqrcodes.tumblr.com/'}
              size={qrConfig?.size || 180}
              bgColor={'#ffffff'}
              fgColor={qrConfig?.color}
              level={'L'}
              includeMargin={false}
            />
          </Stack>
        </Card>
      </Skeleton>

      <Skeleton isLoading={isLoadingUser}>
        <Card>
          <h2>Atualize seu perfil</h2>

          {!user?.isVerified && (
            <Card style={{ marginTop: '15px', fontSize: theme.fontSize.small }}>
              Você ainda não verificou seu email! Acesse sua caixa de entrada e
              clique no link do email que enviamos para você. Caso não consiga{' '}
              <button
                onClick={newVerifyEmail}
                style={{
                  color: theme.colors.blue2,
                  fontWeight: 'bold',
                  fontSize: theme.fontSize.small,
                }}
              >
                {isSendingNewVerifyEmail ? (
                  <Loader width="12px" height="12px" $borderWidth="3px" />
                ) : (
                  'clique aqui'
                )}
              </button>{' '}
              para gerar outro email.
            </Card>
          )}

          <EditUserInfo user={user} refetch={refetchUser} />

          <h2 style={{ margin: '20px 0 15px 0' }}>Atualize sua senha</h2>

          <EditPassForm />

          <Button
            style={{
              marginTop: '20px',
              border: `1px solid ${theme.colors.gray1}`,
              color: theme.colors.gray1,
              width: '150px',
            }}
            type="submit"
            size="small"
            $bg="transparent"
            $bgHover={theme.colors.red}
          >
            Excluir Conta
          </Button>
        </Card>
      </Skeleton>
    </SettingsStyles>
  );
}
