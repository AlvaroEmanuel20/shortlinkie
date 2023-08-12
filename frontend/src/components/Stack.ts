import { styled } from 'styled-components';

export const Stack = styled.div<{
  $spacing?: number;
  $items?: string;
  $justify?: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.$items};
  gap: ${(props) => props.$spacing + 'px'};
  justify-content: ${(props) => props.$justify};
`;
