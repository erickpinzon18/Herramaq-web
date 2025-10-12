'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
}

export const ACMovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
}: MovingBorderProps) => {
  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden bg-transparent p-[1px]',
        containerClassName
      )}
      style={
        {
          '--duration': `${duration}ms`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'absolute inset-0 rounded-2xl',
          'bg-[linear-gradient(90deg,#0066e6,#ffd700,#0066e6)] bg-[length:200%_100%]',
          'animate-moving-border',
          borderClassName
        )}
      />
      <div
        className={cn(
          'relative bg-slate-900 rounded-2xl z-10',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
