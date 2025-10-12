'use client';

import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const RBBadge = ({ variant = 'primary', children, className = '' }: BadgeProps) => {
  const variants: Record<string, string> = {
    primary: 'bg-blue-100 text-blue-800 border-blue-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-slate-100 text-slate-800 border-slate-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
