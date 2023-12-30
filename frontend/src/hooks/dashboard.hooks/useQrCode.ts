import { ReactNode, useRef, useState } from 'react';
import * as htmlToImg from 'html-to-image';
import { toast } from 'react-toastify';

export default function useQrCode() {
  const [qrCode, setQrCode] = useState<ReactNode>();
  const [downloading, setDownloading] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadQrCode = () => {
    setDownloading(true);

    if (qrCodeRef.current === null) {
      return;
    }

    htmlToImg
      .toPng(qrCodeRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qrcode_encurtando.png';
        link.click();

        setDownloading(false);
      })
      .catch(() => {
        toast.error('Erro ao baixar QR Code');
        setDownloading(false);
      });
  };

  return { qrCode, setQrCode, downloadQrCode, downloading, qrCodeRef };
}
