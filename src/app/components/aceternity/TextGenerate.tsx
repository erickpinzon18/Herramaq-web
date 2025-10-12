'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const ACTextGenerate = ({
  words,
  className,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  duration?: number;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + words[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, duration * 1000 / words.length);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, words, duration]);

  return (
    <span className={cn('inline-block', className)}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};
