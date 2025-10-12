'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface WavyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: 'slow' | 'fast';
  waveOpacity?: number;
}

export const ACWavyBackground = ({
  children,
  className,
  containerClassName,
  colors = ['#0066e6', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'],
  waveWidth = 50,
  backgroundFill = 'white',
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
  ...props
}: WavyBackgroundProps) => {
  const noise = () => {
    let seed = 1;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    return random;
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (ctx.canvas.width = window.innerWidth);
    let h = (ctx.canvas.height = window.innerHeight);
    
    ctx.filter = `blur(${blur}px)`;
    
    const getLines = () => {
      return colors.map((color, index) => {
        const offset = (index + 1) / colors.length;
        return {
          color,
          points: Array.from({ length: Math.floor(w / waveWidth) + 1 }, (_, i) => ({
            x: i * waveWidth,
            y: h * (0.5 + Math.sin(i / 8 + offset) * 0.2),
          })),
        };
      });
    };

    let lines = getLines();
    let raf = 0;

    const render = () => {
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = line.color;

        for (let i = 0; i < line.points.length - 1; i++) {
          const p = line.points[i];
          const p2 = line.points[i + 1];
          
          const xc = (p.x + p2.x) / 2;
          const yc = (p.y + p2.y) / 2;
          
          ctx.quadraticCurveTo(p.x, p.y, xc, yc);
        }
        
        ctx.stroke();
      });

      lines = lines.map((line) => ({
        ...line,
        points: line.points.map((p) => ({
          x: p.x,
          y: p.y + Math.sin(raf / (speed === 'fast' ? 50 : 100)) * 2,
        })),
      }));

      raf++;
      animationRef.current = requestAnimationFrame(render);
    };

    const handleResize = () => {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      lines = getLines();
    };

    window.addEventListener('resize', handleResize);
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [blur, colors, speed, waveOpacity, waveWidth, backgroundFill]);

  return (
    <div
      className={cn(
        'h-screen flex flex-col items-center justify-center relative',
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
      ></canvas>
      <div className={cn('relative z-10', className)} {...props}>
        {children}
      </div>
    </div>
  );
};
