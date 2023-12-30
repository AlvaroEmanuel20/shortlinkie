import { styled } from 'styled-components';

type AvatarProps = {
  $bgImg: string;
  size?: number;
};

export const Avatar = styled.div<AvatarProps>`
  border-radius: 100%;
  border: 2px solid ${(props) => props.theme.colors.blue};
  width: ${(props) => (props.size ? `${props.size}px` : '45px')};
  height: ${(props) => (props.size ? `${props.size}px` : '45px')};
  background-image: url(${({ $bgImg }) => $bgImg});
  background-repeat: no-repeat;
  background-size: cover;
`;
