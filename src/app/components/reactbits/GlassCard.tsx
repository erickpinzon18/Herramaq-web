'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
}

export const RBGlassCard = ({ children, className = '', blur = 'md' }: GlassCardProps) => {
  const blurClasses: Record<string, string> = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };

  return (
    <div className={`bg-white/70 ${blurClasses[blur]} rounded-3xl shadow-xl border border-white/20 p-6 ${className}`}>
      {children}
    </div>
  );
};
