import { styled } from 'styled-components';

export const HStack = styled.div<{ $spacing?: number; $justify?: string }>`
  display: flex;
  gap: ${(props) => props.$spacing + 'px'};
  align-items: center;
  justify-content: ${(props) => props.$justify};
`;
