'use client';

import React from 'react';

export const RBCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>{children}</div>
);
