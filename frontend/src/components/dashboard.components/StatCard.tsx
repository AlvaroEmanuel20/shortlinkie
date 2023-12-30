import styled, { useTheme } from 'styled-components';
import { Stack } from '../Stack';
import { Card } from './Card';
import { ChartWrapper } from './ChartWrapper';
import ReactApexChart from 'react-apexcharts';

const StatCardStyles = styled(Card)`
  .stat {
    padding: 15px 15px 0 15px;

    p {
      &:nth-child(1) {
        font-size: ${(props) => props.theme.fontSize.small};
      }

      &:nth-child(2) {
        font-size: ${(props) => props.theme.fontSize.header2};
        font-weight: bold;
      }
    }
  }
`;

type StatCardProps = {
  title: string;
  statNumber: number;
  chartSeries: number[];
  chartSeriesLabel?: string;
  chartXaxis: number[];
};

export default function StatCard({
  title,
  statNumber,
  chartSeries,
  chartSeriesLabel,
  chartXaxis,
}: StatCardProps) {
  const theme = useTheme();

  return (
    <StatCardStyles $padding="0">
      <Stack style={{ height: '100%' }} spacing={5} $justify="space-between">
        <Stack spacing={10} className="stat">
          <p>{title}</p>
          <p>{statNumber}</p>
        </Stack>

        <ChartWrapper>
          <ReactApexChart
            type="area"
            height="100%"
            options={{
              colors: [theme.colors.blue2],
              chart: {
                id: 'area-chart1',
                sparkline: {
                  enabled: true,
                },
                fontFamily: 'Nunito, sans-serif',
              },
              stroke: {
                curve: 'straight',
              },
              xaxis: {
                categories: chartXaxis,
              },
            }}
            series={[
              {
                name: chartSeriesLabel ? chartSeriesLabel : 'Cliques',
                data: chartSeries,
              },
            ]}
          />
        </ChartWrapper>
      </Stack>
    </StatCardStyles>
  );
}
