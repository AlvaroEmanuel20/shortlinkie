import { styled } from 'styled-components';

interface ButtonProps {
  $py?: string;
  $px?: string;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.theme.colors.orange1};
  padding: ${(props) => (props.$py ? props.$py : '8px')} ${(props) => (props.$px ? props.$px : '32px')};
  font-size: ${(props) => props.theme.fontSize.sm};
  border-radius: ${(props) => props.theme.radius.base};
  color: ${(props) => props.theme.colors.white};

  &:hover {
    background-color: ${(props) => props.theme.colors.orange2};
    transition-duration: 200ms;
  }
`;
