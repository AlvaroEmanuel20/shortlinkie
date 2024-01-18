import { Info } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';

export type TooltipPosition = 'top' | 'bottom' | 'right' | 'left';

const TooltipInfoStyles = styled.button`
  position: relative;
  cursor: default;
`;

type TooltipInfoCardProps = {
  $display: boolean;
  $position?: TooltipPosition;
};

const TooltipInfoCardStyles = styled.div<TooltipInfoCardProps>`
  display: ${(props) => (props.$display ? 'block' : 'none')};
  position: absolute;
  bottom: ${({ $position }) =>
    ($position === 'top' && 'calc(100% + 3px)') ||
    (!$position && 'calc(100% + 3px)')};
  top: ${({ $position }) => $position === 'bottom' && 'calc(100% + 3px)'};
  left: ${({ $position }) => $position === 'right' && 'calc(100% + 3px)'};
  right: ${({ $position }) => $position === 'left' && 'calc(100% + 3px)'};
  color: ${(props) => props.theme.colors.gray};
  background-color: ${(props) => props.theme.colors.light};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: ${(props) => props.theme.radius.base};
  font-size: ${(props) => props.theme.fontSize.xsmall};
  text-align: left;
  min-width: 250px;
  padding: 8px 12px;
`;

type TooltipInfoProps = {
  size: number;
  color: string;
  tooltipText: string;
  position?: TooltipPosition;
};

export default function TooltipInfo({
  size,
  color,
  tooltipText,
  position,
}: TooltipInfoProps) {
  const [display, setDisplay] = useState(false);

  return (
    <TooltipInfoStyles
      onMouseEnter={() => setDisplay(true)}
      onMouseLeave={() => setDisplay(false)}
      type="button"
    >
      <Info style={{ cursor: 'pointer' }} size={size} color={color} />
      <TooltipInfoCardStyles $display={display} $position={position}>
        {tooltipText}
      </TooltipInfoCardStyles>
    </TooltipInfoStyles>
  );
}
