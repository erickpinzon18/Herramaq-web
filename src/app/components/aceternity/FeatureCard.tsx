'use client';

import React from 'react';

export const ACFeature = ({ icon, title, description }: { icon?: React.ReactNode; title: string; description: string }) => (
  <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-blue-100/50">
    {/* Gradient background que aparece en hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Decorative corner */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative p-8">
      {/* Icon con efecto hover */}
      <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md">
        {icon}
      </div>
      
      {/* Title */}
      <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-800 transition-colors duration-300">
        {title}
      </h4>
      
      {/* Description */}
      <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
        {description}
      </p>
      
      {/* Animated underline */}
      <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-slate-700 to-slate-500 rounded-full transition-all duration-500"></div>
    </div>
  </div>
);
