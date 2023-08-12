//import { useParams } from 'react-router-dom';
import { styled, useTheme } from 'styled-components';
import { Card } from './components/Card';
import { HStack } from '../components/HStack';
import TrashIcon from '../assets/TrashIcon';
import { Stack } from '../components/Stack';
import { Button } from '../components/Button';
import { Label } from '../components/Label';
import { Input } from '../components/Input';
import ReactApexChart from 'react-apexcharts';

const LinkPageGrid = styled.main`
  display: grid;
  grid-template-columns: 458px 1fr;
  grid-template-rows: 369px 445px;
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
  //const { shortId } = useParams();
  const theme = useTheme();

  return (
    <LinkPageGrid>
      <Card>
        <Stack style={{ height: '100%' }} $justify="space-between">
          <Stack $spacing={30}>
            <HStack $spacing={20} $justify="space-between">
              <h1 style={{ fontSize: theme.fontSize.md }}>
                Google - Buscador de sites
              </h1>

              <button>
                <TrashIcon />
              </button>
            </HStack>

            <Stack $spacing={12}>
              <p className="flex">
                <strong>Link original:</strong>{' '}
                <a href="#">https://google.com</a>
              </p>
              <p className="flex">
                <strong>Link encurtado:</strong>{' '}
                <a href="#">https://encurtando.com/google</a>
              </p>
              <p>
                <strong>Data de criação:</strong> 09/08/2023
              </p>
              <p>
                <strong>Cliques totais:</strong> 6
              </p>
            </Stack>
          </Stack>

          <BtnGrid>
            <Button>Copiar</Button>
            <Button>Gerar QR Code</Button>
          </BtnGrid>
        </Stack>
      </Card>

      <Card>
        <Stack $spacing={30}>
          <h2 style={{ fontSize: theme.fontSize.md }}>Editar Link</h2>

          <form>
            <Stack $spacing={15}>
              <Stack $spacing={10}>
                <Stack $spacing={5}>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Google - Buscador de sites"
                  />
                </Stack>

                <Stack $spacing={5}>
                  <Label htmlFor="link">Link original</Label>
                  <Input
                    type="url"
                    id="link"
                    placeholder="https://google.com"
                  />
                </Stack>

                <Stack $spacing={5}>
                  <Label htmlFor="text">Texto do link</Label>
                  <Input type="text" id="text" placeholder="google" />
                </Stack>
              </Stack>

              <Button>Atualizar</Button>
            </Stack>
          </form>
        </Stack>
      </Card>

      <Card className="item3" $p="0">
        <Stack $spacing={15} style={{ height: '100%' }}>
          <h2
            style={{ fontSize: theme.fontSize.md, padding: '15px 15px 0 15px' }}
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
              type="area"
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
    </LinkPageGrid>
  );
}
