import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animations/fadeIn';
import { Overlay } from '../Overlay';
import hiddenOverflowY from '../../../lib/hiddenOverflowY';

const ModalStyles = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%);
  width: 400px;
  z-index: 20;
  background-color: #fff;
  padding: 15px;
  border: 1px solid ${(props) => props.theme.colors.gray1};
  border-radius: ${(props) => props.theme.radius.base};
  animation: ${fadeIn} 300ms ease-in-out;

  @media (max-width: 500px) {
    width: 100%;
    top: 30%;
  }
`;

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
};

export default function Modal({ children, isOpen, close }: ModalProps) {
  useEffect(() => {
    hiddenOverflowY(isOpen);
  }, [isOpen]);

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={close}></Overlay>
      <ModalStyles $isOpen={isOpen}>{children}</ModalStyles>
    </>
  );
}
