import { styled } from 'styled-components';

export const Stack = styled.div<{ $spacing?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$spacing + 'px'};
`;
