'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GeneticHelixTrack } from '@/types';

interface AudioOrbProps {
  track: GeneticHelixTrack;
  onHover?: (track: GeneticHelixTrack | null) => void;
  isHovered?: boolean;
}

export function AudioOrb({ track, onHover, isHovered = false }: AudioOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;
    
    // Pulsing animation based on tempo
    const pulse = Math.sin(state.clock.elapsedTime * track.features.tempo / 60) * 0.1 + 1;
    const scale = (hovered || isHovered) ? track.size * 1.5 : track.size * pulse;
    
    meshRef.current.scale.setScalar(scale);
    glowRef.current.scale.setScalar(scale * 1.5);
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover?.(track);
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover?.(null);
  };

  // Convert HSL color to hex for Three.js
  const color = track.color;

  return (
    <group
      position={[track.position.x, track.position.y, track.position.z]}
    >
      {/* Main orb */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow ring */}
      {(hovered || isHovered) && (
        <mesh>
          <ringGeometry args={[0.5, 0.6, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

interface AudioOrbsProps {
  tracks: GeneticHelixTrack[];
  onHover?: (track: GeneticHelixTrack | null) => void;
  hoveredTrackId?: string | null;
}

export default function AudioOrbs({ tracks, onHover, hoveredTrackId }: AudioOrbsProps) {
  return (
    <group>
      {tracks.map((track) => (
        <AudioOrb
          key={track.track.id}
          track={track}
          onHover={onHover}
          isHovered={hoveredTrackId === track.track.id}
        />
      ))}
    </group>
  );
}
