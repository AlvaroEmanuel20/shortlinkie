import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const RouterLinkStyled = styled(Link)`
  color: ${(props) => props.theme.colors.orange1};
  font-size: ${(props) => props.theme.fontSize.sm};

  &:hover {
    text-decoration: underline;
  }
`;

export const LinkStyled = styled.a`
  color: ${(props) => props.theme.colors.orange1};
  font-size: ${(props) => props.theme.fontSize.sm};

  &:hover {
    text-decoration: underline;
  }
`;
