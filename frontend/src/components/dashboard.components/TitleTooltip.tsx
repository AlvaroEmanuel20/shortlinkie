import styled, { useTheme } from 'styled-components';
import TooltipInfo, { TooltipPosition } from './TooltipInfo';

type TitleTooltipProps = {
  title: string;
  tooltipText: string;
  position?: TooltipPosition;
};

const TitleTooltipStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  h2 {
    font-weight: normal;
  }

  button {
    display: flex;
  }
`;

export default function TitleTooltip({
  title,
  tooltipText,
  position,
}: TitleTooltipProps) {
  const theme = useTheme();

  return (
    <TitleTooltipStyles>
      <h2>{title}</h2>

      <TooltipInfo
        size={20}
        color={theme.colors.blue2}
        tooltipText={tooltipText}
        position={position}
      />
    </TitleTooltipStyles>
  );
}
