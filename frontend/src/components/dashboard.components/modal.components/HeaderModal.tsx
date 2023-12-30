import { useTheme } from 'styled-components';
import { Queue } from '../../Queue';
import { X } from 'lucide-react';

export default function HeaderModal({
  text,
  close,
}: {
  text: string;
  close: () => void;
}) {
  const theme = useTheme();

  return (
    <Queue $justify="space-between">
      <h3>{text}</h3>
      <button onClick={close}>
        <X size={15} color={theme.colors.blue2} />
      </button>
    </Queue>
  );
}
