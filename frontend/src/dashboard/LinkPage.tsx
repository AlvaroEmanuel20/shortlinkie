import { useNavigate, useParams } from 'react-router-dom';
import { styled, useTheme } from 'styled-components';
import { Card } from './components/Card';
import { HStack } from '../components/HStack';
import TrashIcon from '../assets/TrashIcon';
import { Stack } from '../components/Stack';
import { Button } from '../components/Button';
import ReactApexChart from 'react-apexcharts';
import useQuery from '../hooks/useQuery';
import { ShortUrl } from '../lib/interfaces';
import Skeleton from './components/Skeleton';
import { format } from 'our-dates';
import useMutation from '../hooks/useMutation';
import { Loader } from '../components/Loader';
import EditLinkForm from './components/EditLinkForm';
import useCopy from './hooks/useCopy';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useQrCode from './hooks/useQrCode';
import { QRCodeSVG } from 'qrcode.react';

const LinkPageGrid = styled.main`
  display: grid;
  grid-template-columns: 458px 1fr;
  grid-template-rows: 420px 445px;
  gap: 20px;

  .item3 {
    grid-area: 2 / 1 / span 1 / span 2;
  }

  @media (max-width: 930px) {
    grid-template-columns: 1fr;
    grid-template-rows: 300px 420px 445px;

    .item2 {
      grid-area: 2 / 1 / 2 / 1;
    }

    .item3 {
      grid-area: 3 / 1 / 3 / 1;
    }
  }

  @media (max-width: 450px) {
    grid-template-rows: 340px 420px 400px;
  }

  .flex {
    display: flex;
    gap: 5px;
  }

  .chart {
    svg {
      border-radius: ${(props) => props.theme.radius.md};
    }
  }

  & a {
    color: ${(props) => props.theme.colors.orange1};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const BtnGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 184px 234px;

  @media (max-width: 930px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

export default function LinkPage() {
  const { shortId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { inputRef, copyFunc } = useCopy();
  const { qrCode, setQrCode, downloading, downloadQrCode, qrCodeRef } =
    useQrCode();

  const {
    mutate: mutateDelete,
    isLoading: isLoadingDelete,
    error: errorDelete,
  } = useMutation(`/${shortId}`, 'delete');

  const {
    data: shortUrl,
    isLoading: isLoadingShortUrl,
    error: errorShortUrl,
    refetch,
  } = useQuery<ShortUrl>(`/details/${shortId}?sources=true`);

  useEffect(() => {
    if (errorShortUrl) {
      toast.error('Erro ao carregar detalhes do link');
    }

    if (errorDelete) {
      toast.error('Erro ao excluir link');
    }
  }, [errorShortUrl, errorDelete]);

  return (
    <LinkPageGrid>
      <Skeleton isLoading={isLoadingShortUrl}>
        <Card className="item1">
          {!qrCode && (
            <Stack style={{ height: '100%' }} $justify="space-between">
              <Stack $spacing={30}>
                <HStack $spacing={20} $justify="space-between">
                  <h1 style={{ fontSize: theme.fontSize.md }}>
                    {shortUrl && shortUrl.title}
                  </h1>

                  <button
                    onClick={() => {
                      mutateDelete();
                      navigate('/');
                    }}
                  >
                    {isLoadingDelete ? (
                      <Loader
                        color={theme.colors.orange1}
                        $width="20px"
                        $height="20px"
                        $borderWidth="3px"
                      />
                    ) : (
                      <TrashIcon />
                    )}
                  </button>
                </HStack>

                <Stack $spacing={12}>
                  <p className="flex">
                    <strong>Link original:</strong>{' '}
                    <a href={shortUrl && shortUrl.originalUrl}>
                      {shortUrl && shortUrl.originalUrl}
                    </a>
                  </p>
                  <p className="flex">
                    <strong>Link encurtado:</strong>{' '}
                    <a
                      href={
                        shortUrl && `http://encurtando.com/${shortUrl.shortId}`
                      }
                    >
                      {shortUrl && `http://encurtando.com/${shortUrl.shortId}`}
                    </a>
                  </p>
                  <p>
                    <strong>Data de criação:</strong>{' '}
                    {shortUrl &&
                      format(new Date(shortUrl.createdAt), 'dd/MM/yyyy')}
                  </p>
                  <p>
                    <strong>Cliques totais:</strong>{' '}
                    {shortUrl && shortUrl.clicks}
                  </p>
                </Stack>
              </Stack>

              <BtnGrid>
                <input
                  ref={inputRef}
                  hidden
                  type="text"
                  defaultValue={
                    shortUrl && `http://encurtando.com/${shortUrl.shortId}`
                  }
                />

                <Button onClick={copyFunc}>Copiar</Button>
                <Button
                  onClick={() =>
                    setQrCode(
                      <QRCodeSVG
                        value={`http://localhost:3002/${shortId}?src=qrcode`}
                        fgColor={theme.colors.orange1}
                      />
                    )
                  }
                >
                  Gerar QR Code
                </Button>
              </BtnGrid>
            </Stack>
          )}

          {qrCode && (
            <Stack $spacing={20}>
              <HStack $spacing={20} $justify="space-between">
                <h1 style={{ fontSize: theme.fontSize.md }}>
                  {shortUrl && shortUrl.title}
                </h1>

                <button
                  onClick={() => {
                    mutateDelete();
                    navigate('/');
                  }}
                >
                  {isLoadingDelete ? (
                    <Loader
                      color={theme.colors.orange1}
                      $width="20px"
                      $height="20px"
                      $borderWidth="3px"
                    />
                  ) : (
                    <TrashIcon />
                  )}
                </button>
              </HStack>

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
            </Stack>
          )}
        </Card>
      </Skeleton>

      <Skeleton isLoading={isLoadingShortUrl}>
        <Card className="item2">
          <Stack $spacing={30}>
            <h2 style={{ fontSize: theme.fontSize.md }}>Editar Link</h2>

            {shortId && shortUrl && (
              <EditLinkForm
                refetch={refetch}
                shortId={shortId}
                title={shortUrl.title}
                originalUrl={shortUrl.originalUrl}
              />
            )}
          </Stack>
        </Card>
      </Skeleton>

      <Skeleton isLoading={isLoadingShortUrl}>
        <Card className="item3" $p="0">
          <Stack $spacing={20} style={{ height: '100%' }}>
            <h2
              style={{
                fontSize: theme.fontSize.md,
                padding: '15px 15px 0 15px',
              }}
            >
              Origem dos cliques:
            </h2>

            <div
              className="chart"
              style={{
                height: '100%',
                borderRadius: theme.radius.md,
              }}
            >
              <ReactApexChart
                type="bar" //or area
                height="100%"
                options={{
                  colors: [
                    theme.colors.orange1,
                    '#D6814C',
                    '#D69661',
                    '#D6A078',
                    '#D6B08D',
                    '#D6C0A3',
                    '#D6D0B8',
                    '#D6E0CD',
                  ],
                  noData: {
                    text: 'Sem dados disponíveis',
                  },
                  chart: {
                    toolbar: {
                      show: false,
                    },
                    sparkline: {
                      enabled: true,
                    },
                  },
                  grid: {
                    show: false,
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  xaxis: {
                    categories: shortUrl?.Source.map((source) => source.name),
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
                    show: false,
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
                  legend: {
                    show: false,
                  },
                }}
                series={[
                  {
                    name: 'Cliques',
                    data: shortUrl
                      ? shortUrl.Source.map((source) => source.clicks)
                      : [0],
                  },
                ]}
              />
            </div>
          </Stack>
        </Card>
      </Skeleton>
    </LinkPageGrid>
  );
}
