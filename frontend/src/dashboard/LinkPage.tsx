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

const LinkPageGrid = styled.main`
  display: grid;
  grid-template-columns: 458px 1fr;
  grid-template-rows: 420px 445px;
  gap: 20px;

  .item3 {
    grid-area: 2 / 1 / span 1 / span 2;
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
`;

export default function LinkPage() {
  const { shortId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(
    `/${shortId}`,
    'delete'
  );

  const { data: shortUrl, isLoading: isLoadingShortUrl } = useQuery<ShortUrl>(
    `/details/${shortId}`
  );

  return (
    <LinkPageGrid>
      <Skeleton isLoading={isLoadingShortUrl}>
        <Card>
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
                  <strong>Cliques totais:</strong> {shortUrl && shortUrl.clicks}
                </p>
              </Stack>
            </Stack>

            <BtnGrid>
              <Button>Copiar</Button>
              <Button>Gerar QR Code</Button>
            </BtnGrid>
          </Stack>
        </Card>
      </Skeleton>

      <Skeleton isLoading={isLoadingShortUrl}>
        <Card>
          <Stack $spacing={30}>
            <h2 style={{ fontSize: theme.fontSize.md }}>Editar Link</h2>

            {shortId && shortUrl && (
              <EditLinkForm
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
          <Stack $spacing={15} style={{ height: '100%' }}>
            <h2
              style={{
                fontSize: theme.fontSize.md,
                padding: '15px 15px 0 15px',
              }}
            >
              Estatística de cliques:
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
                    name: 'series1',
                    data: [31, 40, 28, 51, 42, 109, 100],
                  },
                  {
                    name: 'series2',
                    data: [11, 32, 45, 32, 34, 52, 41],
                  },
                  {
                    name: 'series3',
                    data: [3, 50, 42, 22, 60, 120, 33],
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
