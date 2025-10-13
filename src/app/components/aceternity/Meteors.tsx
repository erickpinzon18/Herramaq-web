'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MeteorStyle {
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

export const ACMeteors = ({ number = 20, className }: { number?: number; className?: string }) => {
  const [meteorStyles, setMeteorStyles] = useState<MeteorStyle[]>([]);

  useEffect(() => {
    // Generar estilos solo en el cliente para evitar hydration mismatch
    const styles = new Array(number || 20).fill(null).map(() => ({
      top: Math.floor(Math.random() * 100) + '%',
      left: Math.floor(Math.random() * 100) + '%',
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
    }));
    setMeteorStyles(styles);
  }, [number]);

  // No renderizar nada en el servidor, solo en el cliente
  if (meteorStyles.length === 0) {
    return null;
  }

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={cn(
            'animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={style}
        ></span>
      ))}
    </>
  );
};
