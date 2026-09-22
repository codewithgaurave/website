import React from 'react';

export default function IndiaMapSVG({ className = "" }: { className?: string }) {
  return (
    <img 
      src="/india-map.png" 
      alt="Official Map of India" 
      className={`object-contain select-none ${className}`} 
    />
  );
}
