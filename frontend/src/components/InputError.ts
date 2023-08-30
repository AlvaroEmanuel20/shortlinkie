import { styled } from 'styled-components';

export const InputError = styled.p`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.red};
`;
