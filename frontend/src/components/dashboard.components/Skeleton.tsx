import { ReactNode } from 'react';
import { keyframes, styled } from 'styled-components';

interface Skeleton {
  width?: string;
  height?: string;
  radius?: string;
  className?: string;
}

interface SkeletonComponent extends Skeleton {
  isLoading: boolean;
  children: ReactNode;
}

const loading = keyframes`
  from {
    opacity: 0.4;
  }

  to {
    opacity: 1;
  }
`;

export const SkeletonStyle = styled.div<Skeleton>`
  background-color: #e9e9e9;
  cursor: progress;
  border-radius: ${(props) => props.radius || props.theme.radius.base};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  animation: ${loading} 1s ease alternate infinite;
`;

export default function Skeleton({
  isLoading,
  children,
  width,
  height,
  radius,
  className
}: SkeletonComponent) {
  if (isLoading) {
    return <SkeletonStyle className={className} width={width} height={height} radius={radius} />;
  } else {
    return children;
  }
}
