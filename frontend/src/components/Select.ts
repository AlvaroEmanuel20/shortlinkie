import { styled } from 'styled-components';

export const Select = styled.select`
  padding: 7px 15px;
  border: 1px solid ${(props) => props.theme.colors.blackAlpha};
  border-radius: ${(props) => props.theme.radius.base};
  font-size: ${(props) => props.theme.fontSize.sm};

  &::placeholder {
    color: ${(props) => props.theme.colors.blackAlpha};
  }

  &:focus-within {
    border: 1px solid ${(props) => props.theme.colors.orange1};
    transition-duration: 200ms;
  }
`;
