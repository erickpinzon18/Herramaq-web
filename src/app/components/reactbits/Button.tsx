'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
}

export const RBButton = ({ variant = 'primary', className = '', children, ...rest }: ButtonProps) => {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg px-4 py-2 transition-transform transform focus:outline-none';
  const variants: Record<string, string> = {
    primary: 'bg-blue-800 text-white hover:bg-blue-900 shadow-md',
    ghost: 'bg-white text-blue-800 border border-transparent hover:bg-blue-50',
    outline: 'bg-transparent text-blue-800 border border-blue-200 hover:bg-blue-50',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
};
