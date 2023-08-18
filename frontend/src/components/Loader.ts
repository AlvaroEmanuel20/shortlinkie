import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

interface Loader {
  $width?: string;
  $height?: string;
  $borderWidth?: string;
  $color?: string;
}

export const Loader = styled.span<Loader>`
  width: ${(props) => props.$width || '48px'};
  height: ${(props) => props.$height || '48px'};
  border: ${(props) => props.$borderWidth || '5px'} solid
    ${(props) => props.color};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;
