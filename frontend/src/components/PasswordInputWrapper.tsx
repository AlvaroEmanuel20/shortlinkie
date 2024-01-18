import { Eye, EyeOff } from 'lucide-react';
import { ReactNode } from 'react';
import { styled, useTheme } from 'styled-components';

const PasswordInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  button {
    position: absolute;
    right: 15px;
    top: 13px;
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
  const theme = useTheme();

  return (
    <PasswordInput>
      {children}

      <button type="button" onClick={() => setShow(!show)}>
        {!show ? (
          <Eye color={theme.colors.gray1} size={20} />
        ) : (
          <EyeOff color={theme.colors.gray1} size={20} />
        )}
      </button>
    </PasswordInput>
  );
}
