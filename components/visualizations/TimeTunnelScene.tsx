'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TimeTunnelData, TimeTunnelSegment } from '@/types';

interface TunnelSceneProps {
  data: TimeTunnelData;
  isMobile?: boolean;
}

export default function TimeTunnelScene({ data, isMobile = false }: TunnelSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Tunnel parameters
  const tunnelRadius = 8;
  const tunnelLength = 50;
  
  // Create tunnel geometry
  const tunnelGeometry = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(
      tunnelRadius, 
      tunnelRadius, 
      tunnelLength, 
      isMobile ? 16 : 32, 
      1, 
      true
    );
    geometry.rotateX(Math.PI / 2);
    return geometry;
  }, [tunnelRadius, tunnelLength, isMobile]);
  
  // Create tunnel material with grid pattern
  const tunnelMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Dark background
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 512, 512);
    
    // Grid lines
    ctx.strokeStyle = 'rgba(78, 205, 196, 0.3)';
    ctx.lineWidth = 2;
    
    // Vertical lines
    for (let i = 0; i <= 512; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let i = 0; i <= 512; i += 64) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 2);
    
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.5,
      side: THREE.BackSide,
    });
  }, []);
  
  // Continuous movement through tunnel
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Move forward through tunnel
    const speed = 0.5;
    groupRef.current.position.z = (state.clock.elapsedTime * speed) % tunnelLength;
  });
  
  // Filter segments for mobile
  const segments = isMobile 
    ? data.segments.filter((_, i) => i % 2 === 0) 
    : data.segments;
  
  return (
    <group>
      {/* Tunnel walls */}
      <mesh geometry={tunnelGeometry} material={tunnelMaterial} />
      
      {/* Moving track markers container */}
      <group ref={groupRef}>
        {segments.map((segment, index) => (
          <TrackMarker
            key={index}
            segment={segment}
            tunnelRadius={tunnelRadius}
            index={index}
            totalCount={segments.length}
          />
        ))}
      </group>
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a1a', 10, 50]} />
    </group>
  );
}

interface TrackMarkerProps {
  segment: TimeTunnelSegment;
  tunnelRadius: number;
  index: number;
  totalCount: number;
}

function TrackMarker({ segment, tunnelRadius, index, totalCount }: TrackMarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Calculate position in tunnel
  const angle = segment.position.angle;
  const distance = segment.position.distance;
  const depth = (index / totalCount) * 40 - 20; // Spread along tunnel
  
  const x = Math.cos(angle) * (tunnelRadius - 2) * distance;
  const y = Math.sin(angle) * (tunnelRadius - 2) * distance;
  const z = depth;
  
  // Size based on listening frequency
  const size = Math.max(0.2, segment.size * 0.5);
  
  // Pulsing animation
  useFrame((state) => {
    if (!meshRef.current) return;
    const pulse = Math.sin(state.clock.elapsedTime * 2 + index) * 0.1 + 1;
    meshRef.current.scale.setScalar(size * pulse);
  });
  
  return (
    <mesh ref={meshRef} position={[x, y, z]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={segment.color}
        emissive={segment.color}
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
}
