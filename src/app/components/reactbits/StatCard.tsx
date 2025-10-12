'use client';

import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  gradient?: string;
}

export const RBStatCard = ({ icon, value, label, trend, gradient = 'from-blue-500 to-blue-700' }: StatCardProps) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className="relative p-6">
        {/* Icon */}
        <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        {/* Value */}
        <div className="text-4xl font-bold text-slate-900 mb-1 group-hover:text-blue-800 transition-colors">
          {value}
        </div>
        
        {/* Label */}
        <div className="text-sm text-slate-600 font-medium">
          {label}
        </div>
        
        {/* Trend */}
        {trend && (
          <div className={`mt-2 text-xs font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </div>
        )}
      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/50 to-transparent rounded-bl-full"></div>
    </div>
  );
};
