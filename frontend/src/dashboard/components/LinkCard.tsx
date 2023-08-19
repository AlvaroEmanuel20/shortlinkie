import { styled, useTheme } from 'styled-components';
import { Stack } from '../../components/Stack';
import { HStack } from '../../components/HStack';
import { Button } from '../../components/Button';
import EditIcon from '../../assets/EditIcon';
import TrashIcon from '../../assets/TrashIcon';
import { Link } from 'react-router-dom';
import useMutation from '../../hooks/useMutation';
import { Loader } from '../../components/Loader';
import useCopy from '../hooks/useCopy';
import { ShortId } from '../../lib/interfaces';

interface LinkCard {
  name: string;
  link: string;
  shortId: string;
  refetchs: () => void;
}

const LinkCardStyle = styled.div`
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.orange1};
  border-radius: ${(props) => props.theme.radius.base};

  & a {
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.orange1};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function LinkCard({ name, link, shortId, refetchs }: LinkCard) {
  const { mutate, isLoading } = useMutation(`/${shortId}`, 'delete');
  const theme = useTheme();
  const { inputRef, copyFunc } = useCopy();

  return (
    <LinkCardStyle>
      <Stack $spacing={4}>
        <h3>{name}</h3>
        <a href={link}>{link}</a>
        <input ref={inputRef} hidden type="text" defaultValue={link} />
      </Stack>

      <HStack $spacing={15}>
        <Button onClick={copyFunc}>Copiar</Button>

        <HStack $spacing={10}>
          <Link to={`/link/${shortId}`}>
            <EditIcon />
          </Link>

          <button
            onClick={async () => {
              const res = await mutate<undefined, ShortId>();
              if (res && res.shortId) {
                refetchs();
              }
            }}
          >
            {isLoading ? (
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
      </HStack>
    </LinkCardStyle>
  );
}
