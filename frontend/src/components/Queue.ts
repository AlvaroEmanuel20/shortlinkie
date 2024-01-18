import { styled } from 'styled-components';

type QueueProps = {
  spacing?: number;
  $justify?:
    | 'center'
    | 'space-between'
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | string;
};

export const Queue = styled.div<QueueProps>`
  display: flex;
  gap: ${(props) => props.spacing + 'px'};
  align-items: center;
  justify-content: ${(props) => props.$justify};
`;
