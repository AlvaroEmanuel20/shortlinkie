import { ReactNode } from 'react';
import { styled } from 'styled-components';
import Eye from '../assets/Eye';
import EyeSlash from '../assets/EyeSlash';

const PasswordInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  button {
    position: absolute;
    right: 10px;
    top: 11px;
  }
`;

interface PasswordInput {
  children: ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PasswordInputWrapper({
  children,
  show,
  setShow,
}: PasswordInput) {
  return (
    <PasswordInput>
      {children}

      <button type="button" onClick={() => setShow(!show)}>
        {!show ? <Eye /> : <EyeSlash />}
      </button>
    </PasswordInput>
  );
}
