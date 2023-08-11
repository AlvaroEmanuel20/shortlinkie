import { styled } from 'styled-components';

export const Stack = styled.div<{ $spacing?: number; $items?: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.$items};
  gap: ${(props) => props.$spacing + 'px'};
`;
