import styled, { useTheme } from 'styled-components';
import { Card } from '../../components/dashboard.components/Card';
import { Stack } from '../../components/Stack';
import TitleTooltip from '../../components/dashboard.components/TitleTooltip';
import TableHeader from '../../components/dashboard.components/table.components/TableHeader';
import TableRowData from '../../components/dashboard.components/table.components/TableRowData';
import ReactApexChart from 'react-apexcharts';
import { ChartWrapper } from '../../components/dashboard.components/ChartWrapper';
import StatCard from '../../components/dashboard.components/StatCard';
import useQuery from '../../hooks/useQuery';
import { ShortUrl } from '../../lib/types';
import Skeleton from '../../components/dashboard.components/Skeleton';
import { toast } from 'react-toastify';
import AddShorturlForm from '../../components/dashboard.components/forms.components/AddShorturlForm';

const HomeStyles = styled.div`
  padding-bottom: 45px;
  display: grid;
  grid-template-columns: minmax(400px, 36%) 1fr;
  grid-template-rows: 138px 140px 220px minmax(276px, 1fr);
  gap: 20px;

  h2 {
    font-weight: normal;
  }

  .item5 {
    grid-area: 1 / 2 / span 4 / 2;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 140px 275px 700px;

    .item5 {
      grid-area: 3 / 1 / span 3 / span 2;
    }
  }

  @media (max-width: 670px) {
    grid-template-columns: 1fr;
    grid-template-rows: 140px 140px 240px 275px 500px;

    .item5 {
      grid-area: 5 / 1 / span 5 / span 1;
    }
  }
`;

const TableStyles = styled.table`
  min-width: 100%;

  th {
    &:nth-child(1) {
      border-top-left-radius: ${(props) => props.theme.radius.base};
      border-bottom-left-radius: ${(props) => props.theme.radius.base};
    }

    &:nth-child(3) {
      border-top-right-radius: ${(props) => props.theme.radius.base};
      border-bottom-right-radius: ${(props) => props.theme.radius.base};
    }
  }

  @media (max-width: 670px) {
    min-width: 580px;
  }
`;

export default function Home() {
  const theme = useTheme();

  const {
    data: shorturls,
    isLoading: isLoadingShorturls,
    refetch: refetchShorturls,
  } = useQuery<ShortUrl[]>('/shorturls', (error) => {
    if (error) toast.error('Erro ao carregar seus links.');
  });

  return (
    <HomeStyles>
      <Skeleton isLoading={isLoadingShorturls}>
        <StatCard
          title="Cliques totais:"
          statNumber={
            shorturls
              ? shorturls.reduce(
                  (acc, value) => (acc += value._count.clicks),
                  0
                )
              : 0
          }
          chartSeries={[130, 840, 645, 550, 349, 260, 870, 1000]}
          chartXaxis={[1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]}
        />
      </Skeleton>

      <Skeleton isLoading={isLoadingShorturls}>
        <StatCard
          title="URLs totais:"
          statNumber={shorturls ? shorturls.length : 0}
          chartSeries={[130, 840, 645, 550, 349, 260, 870, 1000]}
          chartXaxis={[1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]}
          chartSeriesLabel="URLs criadas"
        />
      </Skeleton>

      <Skeleton isLoading={true}>
        <Card $padding="0">
          <Stack
            style={{ height: '100%' }}
            spacing={5}
            $justify="space-between"
          >
            <div style={{ padding: '15px 15px 0 15px' }}>
              <TitleTooltip
                title="Cliques x Origem do clique:"
                tooltipText="Esse gráfico mostra a quantidade de cliques para cada origem de clique. Exemplo: instagram - 12 cliques."
              />
            </div>

            <ChartWrapper height={160}>
              <ReactApexChart
                type="bar"
                height="100%"
                options={{
                  colors: [
                    theme.colors.blue,
                    theme.colors.blue1,
                    theme.colors.blue2,
                  ],
                  chart: {
                    id: 'bar-chart1',
                    sparkline: {
                      enabled: true,
                    },
                    fontFamily: 'Nunito, sans-serif',
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 4,
                    },
                  },
                  fill: {
                    type: 'solid',
                  },
                  xaxis: {
                    categories: [
                      1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1998,
                      1999, 2000,
                    ],
                  },
                }}
                series={[
                  {
                    name: 'Cliques',
                    data: [
                      130, 840, 645, 550, 349, 260, 870, 1000, 1400, 1600, 850,
                    ],
                  },
                ]}
              />
            </ChartWrapper>
          </Stack>
        </Card>
      </Skeleton>

      <Skeleton isLoading={false}>
        <Card>
          <Stack spacing={15}>
            <h2>Criar Link</h2>
            <AddShorturlForm refetch={refetchShorturls} />
          </Stack>
        </Card>
      </Skeleton>

      <Skeleton isLoading={isLoadingShorturls} className="item5">
        <Card style={{ overflowX: 'auto' }} className="item5">
          <Stack spacing={15}>
            <h2>Seus Links</h2>

            <div style={{ overflowX: 'auto', width: '100%' }}>
              <TableStyles style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <TableHeader title="Título" />
                    <TableHeader title="Link" />
                    <TableHeader title="Cliques" colspan={2} />
                  </tr>
                </thead>

                <tbody>
                  {!isLoadingShorturls &&
                    shorturls &&
                    shorturls.map((item) => (
                      <TableRowData
                        key={item.shortId}
                        name={item.title}
                        shortLink={`https://encurt.com/${item.shortId}`}
                        shortId={item.shortId}
                        clicks={item._count.clicks}
                      />
                    ))}
                </tbody>
              </TableStyles>
            </div>
          </Stack>
        </Card>
      </Skeleton>
    </HomeStyles>
  );
}
