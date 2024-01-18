import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function useCopy() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const copyFunc = (src?: string) => {
    if (inputRef.current) {
      inputRef.current.select();
      inputRef.current.setSelectionRange(0, 99999);

      if (src) {
        navigator.clipboard.writeText(inputRef.current.value + `?src=${src}`);
      } else {
        navigator.clipboard.writeText(inputRef.current.value);
      }
    }

    setCopied(true);
    toast.success('Copiado');
    setTimeout(() => setCopied(false), 1000);
  };

  return { inputRef, copyFunc, copied };
}
