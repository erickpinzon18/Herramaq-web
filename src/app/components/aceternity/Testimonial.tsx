'use client';

import React from 'react';

export const ACTestimonial = ({ quote, author, company }: { quote: string; author: string; company?: string }) => (
  <blockquote className="bg-blue-800 text-white rounded-lg p-6 shadow-lg">
    <p className="italic mb-4">"{quote}"</p>
    <div className="text-sm font-semibold">{author} {company && <span className="text-blue-200">· {company}</span>}</div>
  </blockquote>
);
