import { styled } from 'styled-components';

export const AuthLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  @media (max-width: 400px) {
    padding: 0 15px;
  }
`;
