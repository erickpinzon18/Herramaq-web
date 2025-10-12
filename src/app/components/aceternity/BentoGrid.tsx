'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoGridItemProps {
  title?: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const ACBentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};

export const ACBentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        'row-span-1 rounded-xl group/bento hover:shadow-2xl transition duration-200 shadow-lg p-6 bg-white border border-blue-100 justify-between flex flex-col space-y-4',
        'hover:scale-105 hover:-translate-y-1',
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-slate-800 mb-2 mt-2 text-lg">
          {title}
        </div>
        <div className="font-sans font-normal text-slate-600 text-sm">
          {description}
        </div>
      </div>
    </div>
  );
};
