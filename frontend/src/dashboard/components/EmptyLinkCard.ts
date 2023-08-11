import { styled } from 'styled-components';

export const EmptyLinkCard = styled.div<{ $color?: string }>`
  height: 61px;
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.theme.radius.base};
`;
