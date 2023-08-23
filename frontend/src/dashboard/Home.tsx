import { styled, useTheme } from 'styled-components';
import { Card } from './components/Card';
import { Stack } from '../components/Stack';
import { Text } from '../components/Typography';
import LinkCard from './components/LinkCard';
import Skeleton from './components/Skeleton';
import useQuery from '../hooks/useQuery';
import { ShortUrl, Totals } from '../lib/interfaces';
import { EmptyLinkCard } from './components/EmptyLinkCard';
import AddLinkForm from './components/AddLinkForm';
import AddQrForm from './components/AddQrForm';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const HomeGrid = styled.main`
  display: grid;
  grid-template-columns: 458px 1fr;
  grid-template-rows: 103px 104px 320px 247px;
  gap: 20px;

  .item5 {
    grid-area: 1 / 2 / span 4 / span 2;
  }
`;

export default function Home() {
  const theme = useTheme();

  const {
    data: totals,
    isLoading: isLoadingTotals,
    error: errorTotals,
    refetch: refetchTotals,
  } = useQuery<Totals>('/all/totals');

  const {
    data: shortUrls,
    isLoading: isLoadingShortUrls,
    error: errorShortUrls,
    refetch: refetchShortUrls,
  } = useQuery<ShortUrl[]>('/all');

  const refetchs = () => {
    refetchTotals();
    refetchShortUrls();
  };

  useEffect(() => {
    if (errorTotals) {
      toast.error('Erro ao carregar os totais');
    }

    if (errorShortUrls) {
      toast.error('Erro ao carregar os seus links');
    }
  }, [errorTotals, errorShortUrls]);

  return (
    <HomeGrid>
      <Skeleton isLoading={isLoadingTotals}>
        <Card>
          <Stack $spacing={8}>
            <Text>Cliques totais:</Text>

            <Text $fs={theme.fontSize.xl} $fw="bold">
              {(totals && totals.totalClicks) || 0}
            </Text>
          </Stack>
        </Card>
      </Skeleton>

      <Skeleton isLoading={isLoadingTotals}>
        <Card>
          <Stack $spacing={8}>
            <Text>URLs totais:</Text>

            <Text $fs={theme.fontSize.xl} $fw="bold">
              {(totals && totals.totalUrls) || 0}
            </Text>
          </Stack>
        </Card>
      </Skeleton>

      <Card>
        <Stack $spacing={20}>
          <h2 style={{ fontSize: theme.fontSize.md }}>Adicionar Link</h2>
          <AddLinkForm refetchs={refetchs} />
        </Stack>
      </Card>

      <Card>
        <Stack $spacing={20}>
          <h2 style={{ fontSize: theme.fontSize.md }}>Gerar QR Code</h2>
          <AddQrForm />
        </Stack>
      </Card>

      <Card className="item5">
        <Stack $spacing={15}>
          <h2 style={{ fontSize: theme.fontSize.md }}>Seus Links</h2>

          <Stack $spacing={15}>
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                isLoading={isLoadingShortUrls}
                $width="100%"
                $height="61px"
                $radius={theme.radius.base}
              >
                {}
              </Skeleton>
            ))}

            {!isLoadingShortUrls && !shortUrls && (
              <EmptyLinkCard color="rgba(105, 105, 105, 0.082)" />
            )}

            {!isLoadingShortUrls && !shortUrls && (
              <EmptyLinkCard color="rgba(194, 194, 194, 0.11)" />
            )}

            {!isLoadingShortUrls && !shortUrls && (
              <EmptyLinkCard color="rgba(207, 207, 207, 0.11)" />
            )}

            {!isLoadingShortUrls &&
              shortUrls &&
              shortUrls.map((shortUrl) => (
                <LinkCard
                  key={shortUrl.shortId}
                  name={shortUrl.title}
                  link={`http://localhost:3002/${shortUrl.shortId}`}
                  shortId={shortUrl.shortId}
                  refetchs={refetchs}
                />
              ))}
          </Stack>
        </Stack>
      </Card>
    </HomeGrid>
  );
}
