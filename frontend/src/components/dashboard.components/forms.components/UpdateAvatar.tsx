import { FormEvent, useContext, useRef, useState } from 'react';
import { Stack } from '../../Stack';
import { Queue } from '../../Queue';
import { PhotoUpload } from '../PhotoUpload';
import Skeleton from '../Skeleton';
import { Avatar } from '../Avatar';
import { Upload } from 'lucide-react';
import { Button } from '../../Button';
import { useTheme } from 'styled-components';
import { AuthContext } from '../../../context/auth.context/AuthContext';
import useMutation from '../../../hooks/useMutation';
import { toast } from 'react-toastify';
import { Loader } from '../../Loader';

export default function UpdateAvatar() {
  const theme = useTheme();
  const auth = useContext(AuthContext);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileSelected, setFileSelected] = useState<FileList | null>();

  const { mutate, isLoading } = useMutation(
    '/api/users/avatar',
    'put',
    (error) => {
      if (error) toast.error('Erro ao enviar nova foto');
    },
    true
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileSelected || !fileSelected[0]) return;

    const formData = new FormData();
    formData.append('avatar', fileSelected[0]);

    const res = await mutate<FormData, { avatarId: string }>(formData);
    if (res && res.avatarId) auth?.refetchUser();
  };

  return (
    <Stack style={{ marginTop: '15px' }} spacing={15}>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <Queue spacing={10} $justify="space-between">
          <PhotoUpload onClick={() => inputFileRef.current?.click()}>
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
                      auth.user.avatarPresignedUrl
                        ? auth.user.avatarPresignedUrl
                        : `https://ui-avatars.com/api/?name=${
                            auth.user.user.name.split(' ')[0]
                          }&background=ADB5BD`
                    }
                  />
                ) : (
                  <Avatar $bgImg="https://ui-avatars.com/api/?background=ADB5BD" />
                )}
              </Skeleton>
            </div>

            <Queue spacing={10}>
              <p style={{ fontSize: theme.fontSize.small }}>
                {fileSelected ? fileSelected[0].name : 'Carregar nova foto'}
              </p>
              <Upload size={15} color={theme.colors.blue2} />
            </Queue>
          </PhotoUpload>

          <Button size="small" type="submit">
            {isLoading ? (
              <Stack $items="center">
                <Loader
                  width="20px"
                  height="20px"
                  $borderWidth="3px"
                  color="white"
                />
              </Stack>
            ) : (
              'Enviar'
            )}
          </Button>

          <input
            ref={inputFileRef}
            onChange={(e) => setFileSelected(e.target.files)}
            type="file"
            name="avatar"
            id="avatar"
            hidden
          />
        </Queue>
      </form>
    </Stack>
  );
}
