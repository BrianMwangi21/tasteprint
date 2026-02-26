'use client';

import { ReactNode } from 'react';

interface CosmicTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
  gradient?: boolean;
  glow?: boolean;
}

export function CosmicText({ 
  children, 
  className = '', 
  variant = 'body',
  gradient = false,
  glow = false 
}: CosmicTextProps) {
  const baseClasses = {
    h1: 'text-5xl md:text-7xl font-bold tracking-tight',
    h2: 'text-4xl md:text-5xl font-bold tracking-tight',
    h3: 'text-2xl md:text-3xl font-semibold',
    h4: 'text-xl md:text-2xl font-semibold',
    body: 'text-base md:text-lg',
    caption: 'text-sm text-gray-400',
  };

  const gradientClasses = gradient 
    ? 'bg-gradient-to-r from-[#4ECDC4] via-[#6C5CE7] to-[#FFD93D] bg-clip-text text-transparent' 
    : '';
  
  const glowClasses = glow 
    ? 'drop-shadow-[0_0_10px_rgba(78,205,196,0.5)]' 
    : '';

  const Component = variant.startsWith('h') ? variant : 'span';

  return (
    <Component className={`${baseClasses[variant]} ${gradientClasses} ${glowClasses} ${className}`}>
      {children}
    </Component>
  );
}

interface GlowingTextProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function GlowingText({ 
  children, 
  className = '',
  color = '#4ECDC4'
}: GlowingTextProps) {
  return (
    <span 
      className={`${className}`}
      style={{
        textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
      }}
    >
      {children}
    </span>
  );
}

interface NeonTextProps {
  children: ReactNode;
  className?: string;
  flicker?: boolean;
}

export function NeonText({ 
  children, 
  className = '',
  flicker = false 
}: NeonTextProps) {
  return (
    <span 
      className={`font-mono tracking-wider text-[#FFD93D] ${flicker ? 'animate-flicker' : ''} ${className}`}
      style={{
        textShadow: '0 0 5px #FFD93D, 0 0 10px #FFD93D, 0 0 20px #FFD93D',
      }}
    >
      {children}
    </span>
  );
}

interface OrbitTextProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function OrbitText({ 
  children, 
  className = '',
  speed = 20 
}: OrbitTextProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <div 
        className="absolute inset-0 blur-md opacity-50"
        style={{
          background: 'linear-gradient(90deg, #4ECDC4, #6C5CE7, #FFD93D, #4ECDC4)',
          backgroundSize: '300% 100%',
          animation: `orbit-gradient ${speed}s linear infinite`,
        }}
      />
      <style jsx>{`
        @keyframes orbit-gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </div>
  );
}

interface ScannerTextProps {
  children: ReactNode;
  className?: string;
}

export function ScannerText({ children, className = '' }: ScannerTextProps) {
  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      <span className="relative z-10">{children}</span>
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4ECDC4]/30 to-transparent"
        style={{
          animation: 'scanner-sweep 3s ease-in-out infinite',
        }}
      />
      <style jsx>{`
        @keyframes scanner-sweep {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export default {
  CosmicText,
  GlowingText,
  NeonText,
  OrbitText,
  ScannerText,
};
