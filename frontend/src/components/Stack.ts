import { styled } from 'styled-components';

export const Stack = styled.div<{
  spacing?: number;
  $items?: 'center' | 'flex-start' | 'flex-end';
  $justify?:
    | 'center'
    | 'space-between'
    | 'flex-start'
    | 'flex-end'
    | 'space-around';
}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.$items};
  gap: ${(props) => props.spacing + 'px'};
  justify-content: ${(props) => props.$justify};
`;
