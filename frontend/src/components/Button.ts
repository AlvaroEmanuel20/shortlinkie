import { styled } from 'styled-components';

type ButtonProps = {
  size?: 'base' | 'small';
  $full?: boolean;
  $bg?: string;
  $bgHover?: string;
};

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.$bg ? props.$bg : props.theme.colors.blue};
  padding: ${({ size }) =>
    (size === 'base' && '13px 15px') ||
    (size === 'small' && '10px 15px') ||
    (!size && '13px 15px')};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: bold;
  border-radius: ${(props) => props.theme.radius.base};
  color: ${(props) => props.theme.colors.light};
  width: ${(props) => props.$full && '100%'};

  &:hover {
    background-color: ${(props) =>
      props.$bgHover ? props.$bgHover : props.theme.colors.blue1};
    transition-duration: 200ms;
  }
`;

export const ButtonOutline = styled(Button)`
  border: 1px solid ${(props) => props.theme.colors.gray1};
  background-color: transparent;
  color: ${(props) => props.theme.colors.gray1};
`;
