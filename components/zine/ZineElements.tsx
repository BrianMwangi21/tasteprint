'use client';

import React from 'react';

export const ZineBackground = () => (
  <>
    <div className="xerox-grain" />
    <div className="halftone" />
    <div className="paper-texture" />
    <div className="fixed inset-0 z-0 bg-size-[40px_40px] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] pointer-events-none" />
  </>
);

export const TapeStrip = ({ className = '', style = {} }: { className?: string, style?: React.CSSProperties }) => (
  <div className={`tape-strip ${className}`} style={style} />
);

export const Sticker = ({ children, className = '', style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
  <div className={`sticker ${className}`} style={style}>
    {children}
  </div>
);

export const InkDistortionFilter = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
    <filter id="ink-distortion">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
    </filter>
  </svg>
);
