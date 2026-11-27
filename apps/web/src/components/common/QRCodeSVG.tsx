import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface Props {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  className?: string;
  altText?: string;
}

export const QRCodeSVG: React.FC<Props> = ({
  value,
  size = 130,
  fgColor = '#000000',
  bgColor = '#FFFFFF',
  className = '',
  altText = 'Código QR de Certificación'
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    // Genera un codigo QR ISO/IEC 18004 estandar de alta resolucion
    // margin: 3 garantiza la zona de silencio (Quiet Zone) requerida por camaras moviles
    QRCode.toDataURL(
      value,
      {
        margin: 3,
        width: Math.max(size * 2, 280), // Renderizado a 2x para nitidez perfecta en pantallas Retina/OLED
        errorCorrectionLevel: 'M',
        color: {
          dark: fgColor,
          light: bgColor
        }
      },
      (err, url) => {
        if (!err && isMounted && url) {
          setDataUrl(url);
          setError(false);
        } else if (err && isMounted) {
          setError(true);
        }
      }
    );

    return () => {
      isMounted = false;
    };
  }, [value, size, fgColor, bgColor]);

  if (error) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className={`bg-white rounded-xl p-2 flex items-center justify-center text-center border border-red-300 ${className}`}
      >
        <span className="text-[10px] text-red-500 font-mono">Error QR</span>
      </div>
    );
  }

  if (!dataUrl) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className={`bg-white rounded-xl p-2 shadow-inner flex items-center justify-center animate-pulse ${className}`}
      >
        <span className="text-[10px] text-slate-400 font-mono">Generando QR...</span>
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`bg-white rounded-xl p-1.5 shadow-md select-none flex items-center justify-center overflow-hidden border border-slate-200 ${className}`}
    >
      <img
        src={dataUrl}
        alt={altText}
        width={size}
        height={size}
        className="w-full h-full object-contain"
        style={{ imageRendering: 'crisp-edges' }}
      />
    </div>
  );
};
