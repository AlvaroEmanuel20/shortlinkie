import { styled } from 'styled-components';

export const Input = styled.input<{ $isPassword?: boolean }>`
  padding: ${(props) => (props.$isPassword ? '8px 35px 8px 15px' : '8px 15px')};
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
