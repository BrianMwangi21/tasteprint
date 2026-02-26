'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface HelixGeometryProps {
  height?: number;
  radius?: number;
  turns?: number;
  segments?: number;
  color?: string;
}

export function DoubleHelix({
  height = 10,
  radius = 3,
  turns = 3,
  segments = 100,
  color = '#4ECDC4',
}: HelixGeometryProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { strand1Points, strand2Points, rungs } = useMemo(() => {
    const strand1Points: THREE.Vector3[] = [];
    const strand2Points: THREE.Vector3[] = [];
    const rungs: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * turns * Math.PI * 2;
      const y = (t - 0.5) * height;

      // Strand 1 (offset by 0)
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      strand1Points.push(new THREE.Vector3(x1, y, z1));

      // Strand 2 (offset by PI)
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      strand2Points.push(new THREE.Vector3(x2, y, z2));

      // Add rung every few segments
      if (i % 5 === 0) {
        rungs.push({
          start: new THREE.Vector3(x1, y, z1),
          end: new THREE.Vector3(x2, y, z2),
        });
      }
    }

    return { strand1Points, strand2Points, rungs };
  }, [height, radius, turns, segments]);

  const strand1Curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(strand1Points);
  }, [strand1Points]);

  const strand2Curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(strand2Points);
  }, [strand2Points]);

  return (
    <group ref={groupRef}>
      {/* Strand 1 */}
      <mesh>
        <tubeGeometry args={[strand1Curve, segments, 0.08, 8, false]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Strand 2 */}
      <mesh>
        <tubeGeometry args={[strand2Curve, segments, 0.08, 8, false]} />
        <meshStandardMaterial
          color="#6C5CE7"
          emissive="#6C5CE7"
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Rungs (connecting lines) */}
      {rungs.map((rung, index) => {
        const midPoint = new THREE.Vector3(
          (rung.start.x + rung.end.x) / 2,
          (rung.start.y + rung.end.y) / 2,
          (rung.start.z + rung.end.z) / 2
        );
        const direction = new THREE.Vector3().subVectors(rung.end, rung.start);
        const length = direction.length();
        const axis = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction.clone().normalize());
        
        return (
          <mesh
            key={index}
            position={midPoint}
            quaternion={quaternion}
          >
            <cylinderGeometry args={[0.02, 0.02, length, 8]} />
            <meshStandardMaterial
              color="#FFD93D"
              emissive="#FFD93D"
              emissiveIntensity={0.2}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default DoubleHelix;
