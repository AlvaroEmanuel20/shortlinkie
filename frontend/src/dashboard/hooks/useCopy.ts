import { useRef } from 'react';
import { toast } from 'react-toastify';

export default function useCopy() {
  const inputRef = useRef<HTMLInputElement>(null);

  const copyFunc = () => {
    if (inputRef.current) {
      inputRef.current.select();
      inputRef.current.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(inputRef.current.value);
    }

    toast.success('Copiado');
  };

  return { inputRef, copyFunc };
}
