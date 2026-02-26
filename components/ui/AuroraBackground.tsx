'use client';

import { useRef, useEffect, useState } from 'react';

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuroraBackground({ children, className = '' }: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const colors = [
      { r: 76, g: 201, b: 240 },   // Cyan
      { r: 124, g: 77, b: 255 },  // Purple
      { r: 0, g: 245, b: 212 },   // Teal
      { r: 192, g: 132, b: 252 }, // Light purple
    ];

    const animate = () => {
      time += 0.002;
      
      // Clear with dark background
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw aurora gradients
      colors.forEach((color, index) => {
        const offset = index * Math.PI / 2;
        const x = dimensions.width / 2 + Math.sin(time + offset) * 200;
        const y = dimensions.height / 2 + Math.cos(time * 0.7 + offset) * 150;
        const radius = 300 + Math.sin(time * 0.5 + offset) * 100;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      });

      // Add noise texture overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * dimensions.width;
        const y = Math.random() * dimensions.height;
        const size = Math.random() * 2;
        ctx.fillRect(x, y, size, size);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [dimensions]);

  return (
    <div className={`relative min-h-screen ${className}`}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="fixed inset-0 z-0 pointer-events-none"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
