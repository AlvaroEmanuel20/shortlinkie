import { styled } from 'styled-components';

export const Avatar = styled.button<{ bgImg?: string }>`
  border-radius: 100%;
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.bgImg});
  background-repeat: no-repeat;
  background-size: cover;
`;
