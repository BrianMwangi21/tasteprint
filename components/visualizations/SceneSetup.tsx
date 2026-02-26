'use client';

import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface SceneSetupProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  backgroundColor?: string;
}

export default function SceneSetup({
  children,
  className = '',
  cameraPosition = [0, 0, 15],
  enableControls = true,
  backgroundColor = '#0a0a1a',
}: SceneSetupProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: backgroundColor }}
      >
        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={75}
          near={0.1}
          far={1000}
        />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4ECDC4" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6C5CE7" />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#FFD93D" />
        
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        
        <Suspense fallback={null}>
          {children}
        </Suspense>
        
        {enableControls && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
          />
        )}
      </Canvas>
    </div>
  );
}
