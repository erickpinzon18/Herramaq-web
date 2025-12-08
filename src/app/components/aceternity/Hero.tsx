'use client';

import React from 'react';
import Link from 'next/link';
import { RBButton } from '../reactbits/Button';

export const ACHero = ({ title, subtitle, cta }: { title: string; subtitle: string; cta?: { label: string; href: string } }) => (
  <section className="relative w-full overflow-hidden py-12 md:py-20 lg:py-28">
    {/* Animated background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.1),transparent_50%)]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(148,163,184,0.1),transparent_50%)]"></div>
    
    <div className="relative container mx-auto px-2 md:px-4 max-w-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Content */}
        <div className="space-y-6 md:space-y-8 animate-fade-in-left px-2 md:px-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs md:text-sm font-semibold">
            <span className="w-2 h-2 bg-slate-600 rounded-full animate-pulse"></span>
            Líder en Soluciones Industriales
          </div>
          
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base md:text-xl text-slate-600 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          {cta && (
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href={cta.href} className="w-full sm:w-auto">
                <RBButton variant="primary" className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  {cta.label} →
                </RBButton>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <RBButton variant="outline" className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  Contactar Ventas
                </RBButton>
              </Link>
            </div>
          )}
          
          {/* Stats mini */}
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800">20+</div>
              <div className="text-sm text-slate-600">Años</div>
            </div>
            <div className="text-center border-l-2 border-slate-200 pl-6">
              <div className="text-3xl font-bold text-slate-800">50+</div>
              <div className="text-sm text-slate-600">Marcas</div>
            </div>
            <div className="text-center border-l-2 border-slate-200 pl-6">
              <div className="text-3xl font-bold text-slate-800">100+</div>
              <div className="text-sm text-slate-600">Clientes</div>
            </div>
          </div>
        </div>
        
        {/* Animated illustration */}
        <div className="animate-fade-in-right">
          <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 overflow-hidden shadow-2xl">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-500/20 via-transparent to-slate-400/20 animate-pulse"></div>
            
            {/* Floating shapes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-40 h-40 bg-white/10 rounded-3xl animate-spin-slow backdrop-blur-sm" style={{ animationDuration: '25s' }}></div>
              <div className="absolute w-32 h-32 bg-slate-400/20 rounded-full animate-bounce backdrop-blur-sm" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
              <div className="absolute w-48 h-48 border-4 border-white/20 rounded-2xl rotate-45 animate-pulse backdrop-blur-sm"></div>
              <div className="absolute w-24 h-24 bg-slate-300/20 rounded-lg animate-spin-slow" style={{ animationDelay: '2s', animationDuration: '15s' }}></div>
            </div>
            
            {/* Logo central */}
            <div className="relative z-10 h-full flex items-center justify-center p-4 md:p-8">
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Icono */}
                  <img src="/logo4k.jpeg" alt="Herramaq Icon" className="w-20 h-20 md:w-28 md:h-28 object-contain" />
                  
                  {/* Texto */}
                  <div className="text-left">
                    <h2 className="text-2xl text-center md:text-4xl font-black text-blue-900 tracking-wide">
                      HERRAMAQ
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">
                      Máquinas, Herramientas, Accesorios Industriales
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Particles */}
            <div className="absolute top-10 left-10 w-3 h-3 bg-white/60 rounded-full animate-ping"></div>
            <div className="absolute bottom-20 right-20 w-4 h-4 bg-yellow-400/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/3 right-10 w-2 h-2 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Decorative bottom wave */}
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
  </section>
);
