
import React from 'react';
import { cn } from "@/lib/utils";

type BlurContainerProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  intensity?: 'low' | 'medium' | 'high';
  hoverable?: boolean;
  style?: React.CSSProperties;
};

export function BlurContainer({
  children,
  className,
  variant = 'light',
  intensity = 'medium',
  hoverable = false,
  style,
}: BlurContainerProps) {
  const getIntensityClasses = () => {
    switch (intensity) {
      case 'low':
        return variant === 'light' 
          ? 'bg-white/40 backdrop-blur-sm' 
          : 'bg-gray-900/40 backdrop-blur-sm';
      case 'high':
        return variant === 'light' 
          ? 'bg-white/80 backdrop-blur-xl' 
          : 'bg-gray-900/80 backdrop-blur-xl';
      default: // medium
        return variant === 'light' 
          ? 'bg-white/60 backdrop-blur-md' 
          : 'bg-gray-900/60 backdrop-blur-md';
    }
  };

  const baseClasses = cn(
    getIntensityClasses(),
    'rounded-2xl border',
    variant === 'light' 
      ? 'border-white/20 shadow-glass text-gray-900' 
      : 'border-gray-800/30 shadow-glass-dark text-white',
    hoverable && 'transition-all duration-300 hover:shadow-glass-lg',
    className
  );

  return (
    <div className={baseClasses} style={style}>
      {children}
    </div>
  );
}
