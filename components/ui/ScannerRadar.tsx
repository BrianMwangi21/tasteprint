'use client';

import { useEffect, useState } from 'react';

interface ScannerRingProps {
  size?: number;
  color?: string;
  duration?: number;
  delay?: number;
}

function ScannerRing({ size = 200, color = '#4ECDC4', duration = 3, delay = 0 }: ScannerRingProps) {
  return (
    <div
      className="absolute rounded-full border-2 opacity-30"
      style={{
        width: size,
        height: size,
        borderColor: color,
        animation: `pulse-ring ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

interface RadarSweepProps {
  size?: number;
  color?: string;
  duration?: number;
}

function RadarSweep({ size = 300, color = '#4ECDC4', duration = 4 }: RadarSweepProps) {
  return (
    <div
      className="absolute rounded-full overflow-hidden"
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: color, opacity: 0.3 }}
      />
      <div
        className="absolute top-0 left-1/2 w-1/2 h-full origin-left"
        style={{
          background: `linear-gradient(90deg, ${color}00 0%, ${color}40 100%)`,
          animation: `radar-sweep ${duration}s linear infinite`,
        }}
      />
    </div>
  );
}

interface ScannerUIProps {
  children?: React.ReactNode;
  className?: string;
}

export function ScannerUI({ children, className = '' }: ScannerUIProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <ScannerRing size={400} color="#4ECDC4" duration={4} delay={0} />
        <ScannerRing size={350} color="#6C5CE7" duration={3.5} delay={0.5} />
        <ScannerRing size={300} color="#4ECDC4" duration={3} delay={1} />
      </div>
      <div className="relative z-10">
        {children}
      </div>
      <style jsx>{`
        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

interface RadarUIProps {
  children?: React.ReactNode;
  className?: string;
  active?: boolean;
}

export function RadarUI({ children, className = '', active = true }: RadarUIProps) {
  const [dots, setDots] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newDots = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      delay: Math.random() * 2,
    }));
    setDots(newDots);
  }, []);

  if (!active) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <RadarSweep size={400} color="#4ECDC4" duration={4} />
      
      {/* Radar grid lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#4ECDC4]/20 to-transparent" />
        <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-[#4ECDC4]/20 to-transparent" />
        <div className="absolute w-3/4 h-3/4 rounded-full border border-[#4ECDC4]/20" />
        <div className="absolute w-1/2 h-1/2 rounded-full border border-[#4ECDC4]/20" />
        <div className="absolute w-1/4 h-1/4 rounded-full border border-[#4ECDC4]/20" />
      </div>

      {/* Animated blips */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-2 h-2 rounded-full bg-[#FFD93D]"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            animation: `radar-blip 2s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}

      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes radar-sweep {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes radar-blip {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default { ScannerUI, RadarUI };
