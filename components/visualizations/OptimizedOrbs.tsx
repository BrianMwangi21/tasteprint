'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { GeneticHelixTrack } from '@/types';

interface OptimizedOrbsProps {
  tracks: GeneticHelixTrack[];
  onHover?: (track: GeneticHelixTrack | null) => void;
  hoveredTrackId?: string | null;
  levelOfDetail?: 'high' | 'medium' | 'low';
}

export default function OptimizedOrbs({
  tracks,
  onHover,
  hoveredTrackId,
  levelOfDetail = 'high',
}: OptimizedOrbsProps) {
  // Geometry and material setup based on LOD
  const { geometry, material } = useMemo(() => {
    const segments = levelOfDetail === 'high' ? 16 : levelOfDetail === 'medium' ? 12 : 8;
    const geo = new THREE.SphereGeometry(0.3, segments, segments);
    
    const mat = new THREE.MeshStandardMaterial({
      roughness: 0.2,
      metalness: 0.8,
    });
    
    return { geometry: geo, material: mat };
  }, [levelOfDetail]);

  // Use instanced mesh for better performance
  const meshCount = tracks.length;
  const instancedMesh = useMemo(() => {
    const mesh = new THREE.InstancedMesh(geometry, material, meshCount);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    return mesh;
  }, [geometry, material, meshCount]);

  // Update instance matrices
  const dummy = new THREE.Object3D();
  const colors = useMemo(() => {
    return tracks.map(track => {
      const color = new THREE.Color(track.color);
      return color;
    });
  }, [tracks]);

  // Set positions and colors for each instance
  tracks.forEach((track, index) => {
    dummy.position.set(
      track.position.x,
      track.position.y,
      track.position.z
    );
    
    // Scale based on hover state and track size
    const isHovered = hoveredTrackId === track.track.id;
    const scale = isHovered ? track.size * 1.5 : track.size;
    dummy.scale.setScalar(scale);
    
    dummy.updateMatrix();
    instancedMesh.setMatrixAt(index, dummy.matrix);
    instancedMesh.setColorAt(index, colors[index]);
  });

  instancedMesh.instanceMatrix.needsUpdate = true;
  if (instancedMesh.instanceColor) {
    instancedMesh.instanceColor.needsUpdate = true;
  }

  return (
    <primitive
      object={instancedMesh}
      onPointerMove={(e: any) => {
        const instanceId = e.instanceId;
        if (instanceId !== undefined && tracks[instanceId]) {
          onHover?.(tracks[instanceId]);
        }
      }}
      onPointerOut={() => {
        onHover?.(null);
      }}
    />
  );
}

// LOD manager based on distance and performance
export function getOptimalLOD(
  trackCount: number,
  isMobile: boolean,
  fps: number
): 'high' | 'medium' | 'low' {
  if (isMobile) return 'low';
  if (fps < 30) return trackCount > 30 ? 'low' : 'medium';
  if (fps < 45) return trackCount > 50 ? 'medium' : 'high';
  return 'high';
}

// Frustum culling optimization
export function shouldRender(
  position: THREE.Vector3,
  cameraPosition: THREE.Vector3,
  frustum: THREE.Frustum
): boolean {
  const objectPosition = new THREE.Vector3(position.x, position.y, position.z);
  return frustum.containsPoint(objectPosition);
}
