import { styled } from 'styled-components';

type CardProps = {
  width?: number | 'full';
  height?: number;
  $padding?: string;
};

export const Card = styled.div<CardProps>`
  padding: ${(props) => (props.$padding ? props.$padding : '15px')};
  border: 1px solid ${(props) => props.theme.colors.gray1};
  border-radius: ${(props) => props.theme.radius.base};
  width: ${({ width }) =>
    (width && width === 'full' && '100%') || (width && `${width}px`)};
  height: ${(props) => props.height && props.height};
`;
