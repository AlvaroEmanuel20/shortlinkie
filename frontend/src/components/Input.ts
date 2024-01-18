import { styled } from 'styled-components';

type InputProps = {
  size?: 'base' | 'small';
  $full?: boolean;
  $isPassword?: boolean;
  $hasError?: boolean;
};

export const Input = styled.input<InputProps>`
  padding: ${({ size }) =>
    (size === 'base' && '13px 15px') ||
    (size === 'small' && '10px 15px') ||
    (!size && '13px 15px')};
  padding-right: ${({ $isPassword }) => $isPassword && '40px'};
  border: 1px solid ${(props) => props.theme.colors.gray1};
  border-radius: ${(props) => props.theme.radius.base};
  font-size: ${(props) => props.theme.fontSize.small};
  width: ${(props) => props.$full && '100%'};

  &::placeholder {
    color: ${(props) => props.theme.colors.gray1};
  }

  &:focus-within {
    border: 1px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.colors.red : theme.colors.blue};
    transition-duration: 200ms;
  }
`;
