import { styled } from 'styled-components';

export const Text = styled.p<{ $fs?: string; $fw?: string }>`
  font-size: ${(props) => props.$fs};
  font-weight: ${(props) => props.$fw};
`;
