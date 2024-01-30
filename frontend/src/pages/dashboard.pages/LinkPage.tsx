import { useNavigate, useParams } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { Card } from '../../components/dashboard.components/Card';
import { Stack } from '../../components/Stack';
import { Button, ButtonOutline } from '../../components/Button';
import { Queue } from '../../components/Queue';
import { Trash2 } from 'lucide-react';
import { Input } from '../../components/Input';
import AddSrcInputWrapper from '../../components/dashboard.components/AddSrcInput';
import TitleTooltip from '../../components/dashboard.components/TitleTooltip';
import ReactApexChart from 'react-apexcharts';
import { ChartWrapper } from '../../components/dashboard.components/ChartWrapper';
import Modal from '../../components/dashboard.components/modal.components/Modal';
import { ContentModal } from '../../components/dashboard.components/modal.components/ContentModal';
import { FooterModal } from '../../components/dashboard.components/modal.components/FooterModal';
import { useState } from 'react';
import HeaderModal from '../../components/dashboard.components/modal.components/HeaderModal';
import useQuery from '../../hooks/useQuery';
import { toast } from 'react-toastify';
import { ClicksBySrc, QrConfig, ShortId, ShortUrl } from '../../lib/types';
import Skeleton from '../../components/dashboard.components/Skeleton';
import dayjs from 'dayjs';
import useMutation from '../../hooks/useMutation';
import { Loader } from '../../components/Loader';
import EditShorturlForm from '../../components/dashboard.components/forms.components/EditShorturlForm';
import useCopy from '../../hooks/dashboard.hooks/useCopy';
import useQrCode from '../../hooks/dashboard.hooks/useQrCode';
import { QRCodeSVG } from 'qrcode.react';

const LinkPageStyles = styled.div`
  padding-bottom: 45px;
  display: grid;
  grid-template-columns: minmax(460px, 40%) 1fr;
  grid-template-rows: minmax(369px, 1fr) 445px;
  gap: 20px;

  h1 {
    font-size: ${(props) => props.theme.fontSize.header3};
    color: ${(props) => props.theme.colors.blue2};
  }

  h2 {
    font-weight: normal;
  }

  .item3 {
    grid-area: 2 / 1 / span 1 / span 2;
  }

  .info {
    p ~ p {
      font-weight: bold;
      color: ${(props) => props.theme.colors.blue2};
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: 369px 369px 445px;

    .item3 {
      grid-area: 3 / 1 / span 3 / span 1;
    }
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  gap: 20px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export default function LinkPage() {
  const { shortId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  const { inputRef, copyFunc } = useCopy();
  const { qrCodeRef, downloadQrCode, downloading } = useQrCode();

  const [src, setSrc] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCopy, setIsOpenCopy] = useState(false);
  const [isOpenQr, setIsOpenQr] = useState(false);

  const { data: shorturl, isLoading: isLoadingShorturl } = useQuery<ShortUrl>(
    `/shorturls/${shortId}`,
    (error) => {
      if (error) toast.error('Erro ao carregar as informações do link');
    }
  );

  const { data: qrConfig, isLoading: isLoadingQrConfig } = useQuery<{
    qrConfig: QrConfig;
    logoPresignedUrl?: string;
    base64LogoPresignedUrl?: string;
  }>(`/api/qrconfig`, (error) => {
    if (error) toast.error('Erro ao carregar as configurações de QR Code');
  });

  const { data: clicksBySrc, isLoading: isLoadingClicksBySrc } =
    useQuery<ClicksBySrc>(`/shorturls/clicks-src/${shortId}`, (error) => {
      if (error) toast.error('Erro ao carregar os cliques por origem');
    });

  const { data: clicksByQr, isLoading: isLoadingClicksByQr } =
    useQuery<ClicksBySrc>(`/shorturls/clicks-qr/${shortId}`, (error) => {
      if (error) toast.error('Erro ao carregar os cliques por QR Code');
    });

  const { mutate: deleteShorturl, isLoading: isDeletingShorturl } = useMutation(
    `/shorturls/${shortId}`,
    'delete',
    (error) => {
      if (error?.statusCode === 404) {
        toast.error('Link não encontrado');
      } else {
        toast.error('Erro ao excluir link');
      }
    }
  );
  const onDelete = async () => {
    const res = await deleteShorturl<undefined, ShortId>();
    if (res && res.shortId) {
      toast.success('Link excluído');
      navigate('/');
    }
  };

  return (
    <>
      <LinkPageStyles>
        <Skeleton isLoading={isLoadingShorturl}>
          <Card>
            <Stack
              style={{ height: '100%' }}
              $justify="space-between"
              spacing={10}
            >
              <Stack spacing={30}>
                <Queue $justify="space-between" spacing={10}>
                  <h1>{shorturl?.title}</h1>

                  <button
                    onClick={() => setIsOpen(true)}
                    style={{ display: 'flex' }}
                  >
                    <Trash2 color={theme.colors.blue2} size={18} />
                  </button>
                </Queue>

                <Stack spacing={10}>
                  <Queue className="info" $justify="space-between" spacing={5}>
                    <p>Link original:</p>
                    <p>{shorturl?.originalUrl}</p>
                  </Queue>
                  <Queue className="info" $justify="space-between" spacing={5}>
                    <p style={{ width: '100%' }}>Link encurtado:</p>

                    <Input
                      ref={inputRef}
                      type="text"
                      style={{
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        textAlign: 'right',
                        fontSize: theme.fontSize.base,
                        color: theme.colors.blue2,
                        fontWeight: 'bold',
                      }}
                      value={`https://encurt.com/${shortId}`}
                      $full
                      disabled
                    />
                  </Queue>
                  <Queue className="info" $justify="space-between" spacing={5}>
                    <p>Criado em:</p>
                    <p>{dayjs(shorturl?.createdAt).format('DD/MM/YYYY')}</p>
                  </Queue>
                  <Queue className="info" $justify="space-between" spacing={5}>
                    <p>Cliques totais:</p>
                    <p>{shorturl?._count.clicks}</p>
                  </Queue>
                </Stack>
              </Stack>

              <Stack spacing={10}>
                <Button onClick={() => setIsOpenCopy(true)} size="small" $full>
                  Copiar Link
                </Button>
                <Button
                  onClick={() => setIsOpenQr(true)}
                  $bg={theme.colors.blue2}
                  size="small"
                  $full
                >
                  Gerar QR Code
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Skeleton>

        <Skeleton isLoading={isLoadingShorturl}>
          <Card>
            <Stack spacing={30}>
              <h2>Editar Link</h2>
              <EditShorturlForm shorturl={shorturl} />
            </Stack>
          </Card>
        </Skeleton>

        <Card className="item3">
          <ChartsGrid>
            <Skeleton isLoading={isLoadingClicksBySrc}>
              <Card $padding="0">
                <Stack
                  style={{ height: '100%' }}
                  spacing={10}
                  $justify="space-between"
                >
                  <div style={{ padding: '15px 15px 0 15px' }}>
                    <TitleTooltip
                      title="Cliques x Origem do clique:"
                      tooltipText="Esse gráfico mostra a quantidade de cliques para cada origem de clique. Exemplo: instagram - 12 cliques."
                    />
                  </div>

                  <ChartWrapper height={300}>
                    <ReactApexChart
                      type="bar"
                      height="100%"
                      options={{
                        colors: [
                          theme.colors.blue,
                          theme.colors.blue1,
                          theme.colors.blue2,
                        ],
                        noData: {
                          text: 'Sem dados disponíveis',
                        },
                        chart: {
                          id: 'bar-chart1',
                          sparkline: {
                            enabled: true,
                          },
                          toolbar: {
                            show: false,
                          },
                          fontFamily: 'Nunito, sans-serif',
                        },
                        plotOptions: {
                          bar: {
                            borderRadius: 4,
                          },
                        },
                        grid: {
                          show: false,
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        legend: {
                          show: false,
                        },
                        fill: {
                          type: 'solid',
                        },
                        xaxis: {
                          categories: clicksBySrc?.map((item) => item.source),
                          labels: {
                            show: false,
                          },
                          axisBorder: {
                            show: false,
                          },
                          axisTicks: {
                            show: false,
                          },
                        },
                        yaxis: {
                          labels: {
                            formatter: function (val) {
                              return val.toFixed(0);
                            },
                          },
                          show: false,
                          axisBorder: {
                            show: false,
                          },
                          axisTicks: {
                            show: false,
                          },
                        },
                      }}
                      series={[
                        {
                          name: 'Cliques',
                          data: clicksBySrc
                            ? clicksBySrc.map((item) => item._count)
                            : [],
                        },
                      ]}
                    />
                  </ChartWrapper>
                </Stack>
              </Card>
            </Skeleton>

            <Skeleton isLoading={isLoadingClicksByQr}>
              <Card $padding="0">
                <Stack
                  style={{ height: '100%' }}
                  spacing={10}
                  $justify="space-between"
                >
                  <div style={{ padding: '15px 15px 0 15px' }}>
                    <TitleTooltip
                      position="left"
                      title="Cliques x QR Code:"
                      tooltipText="Esse gráfico mostra a quantidade de cliques do QR Code. Exemplo: 24/12/2023 - 12 cliques."
                    />
                  </div>

                  <ChartWrapper height={300}>
                    <ReactApexChart
                      type="bar"
                      height="100%"
                      options={{
                        colors: [
                          theme.colors.blue,
                          theme.colors.blue1,
                          theme.colors.blue2,
                        ],
                        noData: {
                          text: 'Sem dados disponíveis',
                        },
                        chart: {
                          id: 'bar-chart1',
                          sparkline: {
                            enabled: true,
                          },
                          toolbar: {
                            show: false,
                          },
                          fontFamily: 'Nunito, sans-serif',
                        },
                        plotOptions: {
                          bar: {
                            borderRadius: 4,
                          },
                        },
                        grid: {
                          show: false,
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        legend: {
                          show: false,
                        },
                        fill: {
                          type: 'solid',
                        },
                        xaxis: {
                          categories: clicksByQr?.map((item) => item.source),
                          labels: {
                            show: false,
                          },
                          axisBorder: {
                            show: false,
                          },
                          axisTicks: {
                            show: false,
                          },
                        },
                        yaxis: {
                          labels: {
                            formatter: function (val) {
                              return val.toFixed(0);
                            },
                          },
                          show: false,
                          axisBorder: {
                            show: false,
                          },
                          axisTicks: {
                            show: false,
                          },
                        },
                      }}
                      series={[
                        {
                          name: 'Cliques',
                          data: clicksByQr
                            ? clicksByQr.map((item) => item._count)
                            : [],
                        },
                      ]}
                    />
                  </ChartWrapper>
                </Stack>
              </Card>
            </Skeleton>
          </ChartsGrid>
        </Card>
      </LinkPageStyles>

      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <HeaderModal
          text="Confirmação de exclusão"
          close={() => setIsOpen(false)}
        />
        <ContentModal>
          <p>Você tem certeza que deseja excluir esse link?</p>
        </ContentModal>
        <FooterModal>
          <Queue spacing={10}>
            <ButtonOutline
              onClick={() => setIsOpen(false)}
              size="small"
              $bgHover={theme.colors.light}
            >
              Cancelar
            </ButtonOutline>
            <Button
              onClick={onDelete}
              $bg={theme.colors.red}
              $bgHover={theme.colors.red}
              style={{ width: '120px' }}
              size="small"
            >
              {isDeletingShorturl ? (
                <Stack $items="center">
                  <Loader
                    width="20px"
                    height="20px"
                    $borderWidth="3px"
                    color="white"
                  />
                </Stack>
              ) : (
                'Excluir'
              )}
            </Button>
          </Queue>
        </FooterModal>
      </Modal>

      <Modal isOpen={isOpenQr} close={() => setIsOpenQr(false)}>
        <HeaderModal text="Gerar Qr Code" close={() => setIsOpenQr(false)} />
        <ContentModal>
          <p style={{ marginBottom: '15px' }}>
            Faça o teste com seu QR Code antes de baixar:
          </p>

          <Stack $items="center" ref={qrCodeRef}>
            <QRCodeSVG
              value={`${import.meta.env.VITE_API_URL}/${shortId}?src=qrcode`}
              size={qrConfig?.qrConfig.size || 180}
              bgColor={'#ffffff'}
              fgColor={qrConfig?.qrConfig.color}
              level={'L'}
              includeMargin={false}
              imageSettings={
                !isLoadingQrConfig && qrConfig?.base64LogoPresignedUrl
                  ? {
                      src: qrConfig.base64LogoPresignedUrl,
                      x: undefined,
                      y: undefined,
                      height: 35,
                      width: 35,
                      excavate: true,
                    }
                  : undefined
              }
            />
          </Stack>
        </ContentModal>
        <FooterModal>
          <Queue spacing={10}>
            <ButtonOutline
              onClick={() => setIsOpenQr(false)}
              size="small"
              $bgHover={theme.colors.light}
            >
              Cancelar
            </ButtonOutline>
            <Button
              onClick={downloadQrCode}
              style={{ width: '120px' }}
              size="small"
            >
              {downloading ? (
                <Stack $items="center">
                  <Loader
                    width="20px"
                    height="20px"
                    $borderWidth="3px"
                    color="white"
                  />
                </Stack>
              ) : (
                'Baixar'
              )}
            </Button>
          </Queue>
        </FooterModal>
      </Modal>

      <Modal isOpen={isOpenCopy} close={() => setIsOpenCopy(false)}>
        <HeaderModal text="Copiar link" close={() => setIsOpenCopy(false)} />
        <ContentModal>
          <p style={{ marginBottom: '15px' }}>
            Você deseja adicionar uma origem ao link?
          </p>
          <AddSrcInputWrapper>
            <Input
              type="text"
              placeholder="Adicione uma origem"
              size="small"
              $full
              onChange={(event) => setSrc(event.target.value)}
              value={src}
            />
          </AddSrcInputWrapper>
        </ContentModal>
        <FooterModal>
          <Queue spacing={10}>
            <ButtonOutline
              onClick={() => setIsOpenCopy(false)}
              size="small"
              $bgHover={theme.colors.light}
            >
              Cancelar
            </ButtonOutline>
            <Button
              onClick={() => copyFunc(src)}
              style={{ width: '120px' }}
              size="small"
            >
              Copiar
            </Button>
          </Queue>
        </FooterModal>
      </Modal>
    </>
  );
}
