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

const AppbarStyle = styled.header`
  margin-bottom: 50px;

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
    .user {
      display: none;
    }
  }
`;

export default function Appbar() {
  const auth = useContext(AuthContext);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const theme = useTheme();

  return (
    <>
      <AppbarStyle>
        <Queue spacing={20} $justify="space-between">
          <Link className="logo" to="/">
            <img width={40} src="/logo-blue.svg" alt="Logo do Encurtando" />
          </Link>

          <Input
            size="small"
            type="search"
            placeholder="Pesquisar"
            className="search"
          />

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
