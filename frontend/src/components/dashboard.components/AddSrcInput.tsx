import { ReactNode } from 'react';
import { styled, useTheme } from 'styled-components';
import TooltipInfo, { TooltipPosition } from './TooltipInfo';

const AddSrcInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  button {
    position: absolute;
    right: 15px;
    top: 13px;
  }
`;

interface AddSrcInput {
  children: ReactNode;
  tooltipPosition?: TooltipPosition;
}

export default function AddSrcInputWrapper({
  children,
  tooltipPosition,
}: AddSrcInput) {
  const theme = useTheme();

  return (
    <AddSrcInput>
      {children}

      <TooltipInfo
        size={18}
        color={theme.colors.gray1}
        tooltipText="Uma origem indica de onde saiu o clique no link (Exemplo: Instagram). Você pode adicionar a origem na criação, edição ou ao copiar o link. Caso queira, pode adicionar diretamente no seu link encurtado, basta colocar ?src=suaorigem após o link (Exemplo: https://encurtando.com/teste?src=suaorigem."
        position={tooltipPosition}
      />
    </AddSrcInput>
  );
}
