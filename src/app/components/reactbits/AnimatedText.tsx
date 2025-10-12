'use client';

import React from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'typeWriter' | 'gradient';
  delay?: number;
}

export const RBAnimatedText = ({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0 
}: AnimatedTextProps) => {
  const animations: Record<string, string> = {
    fadeInUp: 'animate-slide-up',
    fadeInLeft: 'animate-fade-in-left',
    fadeInRight: 'animate-fade-in-right',
    scaleIn: 'animate-scale-in',
    typeWriter: 'animate-type-writer',
    gradient: 'animate-gradient-x',
  };

  const style = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return (
    <div className={`${animations[animation]} ${className}`} style={style}>
      {children}
    </div>
  );
};
