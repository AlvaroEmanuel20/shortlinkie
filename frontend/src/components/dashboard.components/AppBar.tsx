import { styled, useTheme } from 'styled-components';
import { Queue } from '../Queue';
import { Input } from '../Input';
import { Avatar } from './Avatar';
import Skeleton from './Skeleton';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context/AuthContext';
import MobileSidebar from './MobileSidebar';
import { Grip } from 'lucide-react';
import { Stack } from '../Stack';
import useQuery from '../../hooks/useQuery';
import { ShortUrl } from '../../lib/types';
import { toast } from 'react-toastify';

const AppbarStyle = styled.header`
  margin-bottom: 50px;

  .search-box {
    position: relative;
  }

  .search {
    width: 380px;
  }

  .avatar {
    display: flex;
  }

  .user-info {
    p {
      font-size: ${(props) => props.theme.fontSize.small};
      text-align: right;
    }
  }

  @media (min-width: 784px) {
    .menu,
    .logo {
      display: none;
    }
  }

  @media (max-width: 784px) {
    margin-bottom: 40px;

    .search,
    .search-box,
    .user {
      display: none;
    }
  }
`;

const SearchResultsContainer = styled.div`
  position: absolute;
  top: 3rem;
  left: 0;
  background-color: ${(props) => props.theme.colors.light};
  border-radius: ${(props) => props.theme.radius.base};
  width: 100%;
  padding: 10px;
  box-shadow: 4px 6px 10px -5px rgba(0, 0, 0, 0.1);
  min-height: 50px;

  .search-result {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;

    li {
      padding: 5px;
      border-radius: ${(props) => props.theme.radius.base};
    }

    li:hover {
      background-color: ${(props) => props.theme.colors.gray1};
    }
  }
`;

export default function Appbar() {
  const auth = useContext(AuthContext);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const theme = useTheme();

  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);

  const { data: shorturls, isLoading: isLoadingShorturls } = useQuery<
    ShortUrl[]
  >('/shorturls', (error) => {
    if (error) toast.error('Erro ao carregar seus links.');
  });

  const shorturlsResult = shorturls
    ? shorturls.filter((value) =>
        value.title.toLowerCase().startsWith(search.toLowerCase())
      )
    : [];

  return (
    <>
      <AppbarStyle>
        <Queue spacing={20} $justify="space-between">
          <Link className="logo" to="/">
            <img width={40} src="/logo-blue.svg" alt="Logo do Encurtando" />
          </Link>

          <div className="search-box">
            <Skeleton isLoading={isLoadingShorturls}>
              <Input
                size="small"
                type="search"
                placeholder="Pesquisar"
                className="search"
                onFocus={() => setShowResults(true)}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Skeleton>

            {showResults && search.length > 0 && (
              <SearchResultsContainer>
                {shorturlsResult.length > 0 ? (
                  <ul className="search-result">
                    {shorturlsResult.map((value) => (
                      <Link
                        key={value.shortId}
                        onClick={() => setSearch('')}
                        to={`/link/${value.shortId}`}
                      >
                        <li>{value.title}</li>
                      </Link>
                    ))}
                  </ul>
                ) : (
                  'Nenhum resultado'
                )}
              </SearchResultsContainer>
            )}
          </div>

          <Queue className="user" spacing={10}>
            <Stack spacing={2} $items="flex-end" className="user-info">
              <Skeleton
                width="120px"
                height="19px"
                isLoading={!auth || !auth.user}
              >
                <p>{auth?.user?.name}</p>
              </Skeleton>

              <Skeleton
                width="220px"
                height="19px"
                isLoading={!auth || !auth.user}
              >
                <p>{auth?.user?.email}</p>
              </Skeleton>
            </Stack>

            <Skeleton
              isLoading={!auth || !auth.user}
              width="45px"
              height="45px"
              radius="100%"
            >
              <Link className="avatar" to="/configuracoes">
                {auth && auth.user ? (
                  <Avatar
                    $bgImg={
                      auth.user.avatarUrl
                        ? auth.user.avatarUrl
                        : `https://ui-avatars.com/api/?name=${
                            auth.user.name.split(' ')[0]
                          }&background=ADB5BD`
                    }
                  />
                ) : (
                  <Avatar $bgImg="https://ui-avatars.com/api/?background=ADB5BD" />
                )}
              </Link>
            </Skeleton>
          </Queue>

          <button
            className="menu"
            onClick={() => setMobileSidebar(!mobileSidebar)}
          >
            <Grip size={32} color={theme.colors.blue2} />
          </button>
        </Queue>
      </AppbarStyle>

      <MobileSidebar
        isOpen={mobileSidebar}
        close={() => setMobileSidebar(false)}
      />
    </>
  );
}
