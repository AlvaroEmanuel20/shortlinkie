import styled from 'styled-components';
import { Loader } from './Loader';

const LoadingPageStyles = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoadingPage() {
  return (
    <LoadingPageStyles>
      <Loader width='70px' height='70px' $borderWidth='7px' />
    </LoadingPageStyles>
  );
}
