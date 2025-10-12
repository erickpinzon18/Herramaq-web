'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export const ACBackgroundBeams = ({ className }: { className?: string }) => {
  const paths = [
    'M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875',
    'M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867',
    'M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859',
  ];

  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center overflow-hidden',
        className
      )}
    >
      <svg
        className="absolute h-full w-full pointer-events-none"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => (
          <path
            key={index}
            d={path}
            stroke={`url(#grad${index})`}
            strokeOpacity="0.2"
            strokeWidth="0.5"
          />
        ))}
        <defs>
          {paths.map((_, index) => (
            <linearGradient
              key={index}
              id={`grad${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#0066e6" stopOpacity="0">
                <animate
                  attributeName="stop-opacity"
                  values="0;1;0"
                  dur="3s"
                  begin={`${index * 0.5}s`}
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#0066e6" stopOpacity="1">
                <animate
                  attributeName="stop-opacity"
                  values="0;1;0"
                  dur="3s"
                  begin={`${index * 0.5}s`}
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#0066e6" stopOpacity="0">
                <animate
                  attributeName="stop-opacity"
                  values="0;1;0"
                  dur="3s"
                  begin={`${index * 0.5}s`}
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
};
