import { ArrowUpDown } from 'lucide-react';
import { Queue } from '../../Queue';
import styled, { useTheme } from 'styled-components';

type TableHeader = {
  colspan?: number;
  title: string;
};

const TableHeaderStyles = styled.th`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.colors.light};
  color: ${(props) => props.theme.colors.blue2};

  button {
    display: flex;
  }
`;

export default function TableHeader({ colspan, title }: TableHeader) {
  const theme = useTheme();

  return (
    <TableHeaderStyles colSpan={colspan}>
      <Queue spacing={8}>
        {title}
        <button>
          <ArrowUpDown size={12} color={theme.colors.blue2} />
        </button>
      </Queue>
    </TableHeaderStyles>
  );
}
