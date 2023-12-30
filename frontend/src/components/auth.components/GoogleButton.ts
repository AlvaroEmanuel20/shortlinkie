import styled from 'styled-components';
import { Button } from '../Button';

export const GoogleButton = styled(Button)`
  color: ${(props) => props.theme.colors.blue};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.gray1};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: ${(props) => props.theme.colors.light};
    border-color: ${(props) => props.theme.colors.blue};
  }
`;
