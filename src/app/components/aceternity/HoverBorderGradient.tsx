'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  clockwise?: boolean;
}

export const ACHoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...rest
}: HoverBorderGradientProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative p-[1px] overflow-hidden rounded-lg',
        containerClassName
      )}
      style={{
        background: hovered
          ? `linear-gradient(${clockwise ? '0deg' : '360deg'}, #0066e6, #ffd700, #0066e6)`
          : 'transparent',
        transition: `background ${duration}s linear`,
      }}
      {...rest}
    >
      <div
        className={cn(
          'relative bg-white rounded-lg px-6 py-3 transition-all duration-300',
          hovered && 'bg-blue-50',
          className
        )}
      >
        {children}
      </div>
    </Tag>
  );
};
