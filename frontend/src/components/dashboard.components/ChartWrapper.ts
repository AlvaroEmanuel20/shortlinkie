import styled from 'styled-components';

export const ChartWrapper = styled.div<{ height?: number }>`
  height: ${(props) => (props.height ? `${props.height}px` : '55px')};
  width: 100%;
`;
