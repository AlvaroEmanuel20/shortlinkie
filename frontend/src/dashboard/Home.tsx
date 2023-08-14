import { styled, useTheme } from 'styled-components';
import { Card } from './components/Card';
import { Stack } from '../components/Stack';
import { Text } from '../components/Typography';
import { Label } from '../components/Label';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
//import { EmptyLinkCard } from './components/EmptyLinkCard';
import LinkCard from './components/LinkCard';
import Skeleton from './components/Skeleton';
import { useState } from 'react';

const HomeGrid = styled.main`
  display: grid;
  grid-template-columns: 458px 1fr;
  grid-template-rows: 103px 104px 300px 267px;
  gap: 20px;

  .item5 {
    grid-area: 1 / 2 / span 4 / span 2;
  }
`;

export default function Home() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <HomeGrid>
      <Skeleton isLoading={isLoading}>
        <Card>
          <Stack $spacing={8}>
            <Text>Cliques totais:</Text>

            <Text $fs={theme.fontSize.xl} $fw="bold">
              580
            </Text>
          </Stack>
        </Card>
      </Skeleton>

      <Skeleton isLoading={isLoading}>
        <Card>
          <Stack $spacing={8}>
            <Text>URLs totais:</Text>

            <Text $fs={theme.fontSize.xl} $fw="bold">
              40
            </Text>
          </Stack>
        </Card>
      </Skeleton>

      <Card>
        <Stack $spacing={20}>
          <h2 style={{ fontSize: theme.fontSize.md }}>Adicionar Link</h2>

          <form>
            <Stack $spacing={15}>
              <Stack $spacing={10}>
                <Stack $spacing={5}>
                  <Label htmlFor="title">Título</Label>
                  <Input type="text" id="title" placeholder="Título do link" />
                </Stack>

                <Stack $spacing={5}>
                  <Label htmlFor="link">Link</Label>
                  <Input
                    type="url"
                    id="link"
                    placeholder="Link a ser encurtado"
                  />
                </Stack>
              </Stack>

              <Button>Adicionar</Button>
            </Stack>
          </form>
        </Stack>
      </Card>

      <Card>
        <Stack $spacing={20}>
          <h2 style={{ fontSize: theme.fontSize.md }}>Gerar QR Code</h2>

          <form>
            <Stack $spacing={15}>
              <Stack $spacing={5}>
                <Label htmlFor="select">Selecione o link encurtado</Label>
                <Input
                  type="text"
                  id="select"
                  placeholder="Escolha o link para o QR Code"
                />
              </Stack>

              <Button>Gerar</Button>
            </Stack>
          </form>
        </Stack>
      </Card>

      <Card className="item5">
        <Stack $spacing={15}>
          <h2 style={{ fontSize: theme.fontSize.md }}>Seus Links</h2>

          <Stack $spacing={15}>
            {/*<EmptyLinkCard color="rgba(105, 105, 105, 0.082)" />
            <EmptyLinkCard color="rgba(194, 194, 194, 0.11)" />*/}

            <Skeleton
              isLoading={isLoading}
              $width={'100%'}
              $height="61px"
              $radius={theme.radius.base}
            >
              <LinkCard
                name="Google - Buscador de sites"
                link="https://encurtando.com/google"
                shortId="google"
              />
            </Skeleton>

            <Skeleton
              isLoading={isLoading}
              $width={'100%'}
              $height="61px"
              $radius={theme.radius.base}
            >
              <LinkCard
                name="Google - Buscador de sites"
                link="https://encurtando.com/google"
                shortId="google"
              />
            </Skeleton>

            <Skeleton
              isLoading={isLoading}
              $width={'100%'}
              $height="61px"
              $radius={theme.radius.base}
            >
              <LinkCard
                name="Google - Buscador de sites"
                link="https://encurtando.com/google"
                shortId="google"
              />
            </Skeleton>
          </Stack>
        </Stack>
      </Card>
    </HomeGrid>
  );
}
