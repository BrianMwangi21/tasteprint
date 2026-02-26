'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GeneticHelixData, GeneticHelixTrack } from '@/types';
import DoubleHelix from './DoubleHelix';
import AudioOrbs from './AudioOrbs';

interface GeneticHelixProps {
  data: GeneticHelixData;
  isMobile?: boolean;
}

export default function GeneticHelix({ data, isMobile = false }: GeneticHelixProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredTrack, setHoveredTrack] = useState<GeneticHelixTrack | null>(null);
  const [rotationSpeed, setRotationSpeed] = useState(0.002);

  // Continuous rotation animation
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += rotationSpeed;
  });

  // Adjust complexity for mobile
  const trackCount = isMobile ? Math.min(data.tracks.length, 25) : data.tracks.length;
  const tracks = data.tracks.slice(0, trackCount);

  return (
    <group ref={groupRef}>
      {/* DNA double helix backbone */}
      <DoubleHelix
        height={12}
        radius={4}
        turns={4}
        segments={isMobile ? 50 : 100}
      />

      {/* Audio orbs positioned on the helix */}
      <AudioOrbs
        tracks={tracks}
        onHover={setHoveredTrack}
        hoveredTrackId={hoveredTrack?.track.id || null}
      />

      {/* Info panel for hovered track */}
      {hoveredTrack && (
        <group position={[0, 8, 0]}>
          {/* Background plane */}
          <mesh position={[0, 0, -0.1]}>
            <planeGeometry args={[8, 2.5]} />
            <meshBasicMaterial color="#0a0a1a" transparent opacity={0.9} />
          </mesh>
          
          {/* Track name text (simplified as colored bar) */}
          <mesh position={[-3, 0.5, 0]}>
            <boxGeometry args={[6, 0.3, 0.1]} />
            <meshBasicMaterial color={hoveredTrack.color} />
          </mesh>

          {/* Artist bar */}
          <mesh position={[-2, 0, 0]}>
            <boxGeometry args={[4, 0.2, 0.1]} />
            <meshBasicMaterial color="#6C5CE7" />
          </mesh>

          {/* Audio features bars */}
          {/* Energy */}
          <mesh position={[-3.5, -0.5, 0]}>
            <boxGeometry args={[hoveredTrack.features.energy * 3, 0.15, 0.1]} />
            <meshBasicMaterial color="#FFD93D" />
          </mesh>
          
          {/* Valence */}
          <mesh position={[-3.5, -0.8, 0]}>
            <boxGeometry args={[hoveredTrack.features.valence * 3, 0.15, 0.1]} />
            <meshBasicMaterial color="#4ECDC4" />
          </mesh>

          {/* Danceability */}
          <mesh position={[-3.5, -1.1, 0]}>
            <boxGeometry args={[hoveredTrack.features.danceability * 3, 0.15, 0.1]} />
            <meshBasicMaterial color="#FF6B6B" />
          </mesh>
        </group>
      )}
    </group>
  );
}
