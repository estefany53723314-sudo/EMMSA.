import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, RefreshCw } from 'lucide-react';

interface EmmsaLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  variant?: 'full' | 'icon-only' | 'horizontal';
  shape?: 'square' | 'circle' | 'none';
  fit?: 'cover' | 'contain';
  showSubtitle?: boolean;
  allowUpload?: boolean;
}

export const EmmsaLogo: React.FC<EmmsaLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'icon-only',
  shape = 'square',
  fit = 'cover',
  showSubtitle = false,
  allowUpload = false,
}) => {
  const [logoSrc, setLogoSrc] = useState<string>(() => {
    try {
      return localStorage.getItem('emmsa_custom_logo') || '/emmsa_logo.svg';
    } catch {
      return '/emmsa_logo.svg';
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleLogoChange = () => {
      try {
        const saved = localStorage.getItem('emmsa_custom_logo');
        setLogoSrc(saved || '/emmsa_logo.svg');
      } catch {
        // ignore
      }
    };

    window.addEventListener('emmsa_logo_changed', handleLogoChange);
    window.addEventListener('storage', handleLogoChange);
    return () => {
      window.removeEventListener('emmsa_logo_changed', handleLogoChange);
      window.removeEventListener('storage', handleLogoChange);
    };
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        try {
          localStorage.setItem('emmsa_custom_logo', result);
          setLogoSrc(result);
          window.dispatchEvent(new Event('emmsa_logo_changed'));
        } catch (err) {
          console.error('Error saving logo', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCustomLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem('emmsa_custom_logo');
      setLogoSrc('/emmsa_logo.svg');
      window.dispatchEvent(new Event('emmsa_logo_changed'));
    } catch {
      // ignore
    }
  };

  const sizeMap: Record<string, { box: string; img: string }> = {
    xs: { box: 'w-7 h-7', img: 'max-h-7' },
    sm: { box: 'w-9 h-9', img: 'max-h-9' },
    md: { box: 'w-12 h-12', img: 'max-h-12' },
    lg: { box: 'w-20 h-20', img: 'max-h-20' },
    xl: { box: 'w-28 h-28', img: 'max-h-28' },
    custom: { box: '', img: '' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const roundedClass =
    shape === 'circle'
      ? 'rounded-full'
      : shape === 'square'
      ? 'rounded-2xl'
      : shape === 'none'
      ? ''
      : 'rounded-xl';

  const isCustom = logoSrc !== '/emmsa_logo.svg';

  const logoImg = (
    <img
      src={logoSrc}
      alt="Logotipo EMMSA"
      className={`w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} select-none`}
    />
  );

  const containerContent = (
    <div
      onClick={() => allowUpload && fileInputRef.current?.click()}
      className={`relative inline-flex items-center justify-center bg-white shadow-xs border border-gray-100/80 shrink-0 overflow-hidden ${roundedClass} ${currentSize.box} ${allowUpload ? 'cursor-pointer group hover:ring-2 hover:ring-[#006b5d]/40 transition-all' : ''} ${className}`}
      title={allowUpload ? 'Haz clic para subir o cambiar tu imagen original del logo' : 'EMMSA - Recordatorio de Medicamentos'}
    >
      {logoImg}

      {/* Upload overlay if enabled */}
      {allowUpload && (
        <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-1 backdrop-blur-xs">
          <Camera className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-bold text-center leading-tight">Subir Imagen</span>
        </div>
      )}

      {/* Hidden file input */}
      {allowUpload && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />
      )}
    </div>
  );

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {containerContent}
        <div className="min-w-0">
          <h1 className="font-serif font-black text-2xl tracking-wide text-white leading-tight">
            EMMSA
          </h1>
          <p className="text-[11px] text-[#a8c7d8] font-medium leading-tight mt-0.5">
            Recordatorio de Medicamentos
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center justify-center text-center gap-2 ${className}`}>
        {containerContent}
        
        {allowUpload && (
          <div className="flex items-center gap-2 mt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-semibold transition-all border border-white/20"
            >
              <Upload className="w-3.5 h-3.5 text-[#7ef7e0]" />
              <span>{isCustom ? 'Cambiar imagen' : 'Subir tu imagen'}</span>
            </button>
            {isCustom && (
              <button
                type="button"
                onClick={handleRemoveCustomLogo}
                className="p-1 rounded-full text-white/60 hover:text-white transition-colors"
                title="Restablecer logotipo predeterminado"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {showSubtitle && (
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#006b5d] mt-0.5">
              Recordatorio de Medicamentos
            </p>
          </div>
        )}
      </div>
    );
  }

  return containerContent;
};
