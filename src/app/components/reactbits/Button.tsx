'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
}

export const RBButton = ({ variant = 'primary', className = '', children, ...rest }: ButtonProps) => {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg px-4 py-2 transition-transform transform focus:outline-none';
  const variants: Record<string, string> = {
    primary: 'bg-slate-800 text-white hover:bg-slate-900 shadow-md',
    ghost: 'bg-white text-slate-800 border border-transparent hover:bg-slate-50',
    outline: 'bg-transparent text-slate-800 border border-slate-300 hover:bg-slate-50',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
};
