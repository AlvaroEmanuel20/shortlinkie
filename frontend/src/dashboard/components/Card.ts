import { styled } from 'styled-components';

export const Card = styled.div<{ $p?: string }>`
  background-color: ${(props) => props.theme.colors.white};
  padding: ${(props) => (props.$p ? props.$p : '15px')};
  border-radius: ${(props) => props.theme.radius.md};
`;
