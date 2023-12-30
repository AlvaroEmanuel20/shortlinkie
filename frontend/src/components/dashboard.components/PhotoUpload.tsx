import { Upload } from 'lucide-react';
import { Queue } from '../Queue';
import { Avatar } from './Avatar';
import Skeleton from './Skeleton';
import styled, { useTheme } from 'styled-components';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context/AuthContext';

const PhotoUploadStyles = styled.button`
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.gray1};
  border-radius: ${(props) => props.theme.radius.base};
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.light};
    transition-duration: 200ms;
  }

  .avatar-abs {
    position: absolute;
    left: 0;
    top: 0;
  }
`;

export default function PhotoUpload({ text }: { text: string }) {
  const auth = useContext(AuthContext);
  const theme = useTheme();

  return (
    <PhotoUploadStyles>
      <div className="avatar-abs">
        <Skeleton
          isLoading={!auth || !auth.user}
          width="45px"
          height="45px"
          radius="100%"
        >
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
        </Skeleton>
      </div>

      <Queue spacing={10}>
        <p style={{ fontSize: theme.fontSize.small }}>{text}</p>
        <Upload size={15} color={theme.colors.blue2} />
      </Queue>
    </PhotoUploadStyles>
  );
}
