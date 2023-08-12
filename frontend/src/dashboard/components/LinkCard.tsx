import { styled } from 'styled-components';
import { Stack } from '../../components/Stack';
import { HStack } from '../../components/HStack';
import { Button } from '../../components/Button';
import EditIcon from '../../assets/EditIcon';
import TrashIcon from '../../assets/TrashIcon';
import { Link } from 'react-router-dom';

interface LinkCard {
  name: string;
  link: string;
  shortId: string;
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

export default function LinkCard({ name, link, shortId }: LinkCard) {
  return (
    <LinkCardStyle>
      <Stack $spacing={4}>
        <h3>{name}</h3>
        <a href={link}>{link}</a>
      </Stack>

      <HStack $spacing={15}>
        <Button>Copiar</Button>

        <HStack $spacing={10}>
          <Link to={`/link/${shortId}`}>
            <EditIcon />
          </Link>

          <button>
            <TrashIcon />
          </button>
        </HStack>
      </HStack>
    </LinkCardStyle>
  );
}
