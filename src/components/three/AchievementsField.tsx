'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollBand } from './useScrollBand';
import { holographicVertex, holographicFragment } from './shaders/common';

/**
 * Achievements field — a cluster of small glowing octahedrons that orbit
 * each other in the achievements section band. Each rotates independently
 * creating a "trophy constellation" effect.
 */
const CLUSTER_COUNT = 9;

function GlowGem({ index, total }: { index: number; total: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  // Distribute gems on a spiral.
  const angle = (index / total) * Math.PI * 2;
  const radius = 0.9 + (index % 3) * 0.3;
  const y = (index % 3 - 1) * 0.55;

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.4 + index;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.3 + index * 0.5;
  });

  return (
    <Float speed={1.5 + index * 0.1} rotationIntensity={0.5} floatIntensity={0.4}>
      <mesh ref={mesh} position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}>
        <octahedronGeometry args={[0.14 + (index % 3) * 0.04, 0]} />
        <meshStandardMaterial
          color={index % 2 ? '#38bdf8' : '#a855f7'}
          emissive={index % 2 ? '#38bdf8' : '#a855f7'}
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function AchievementsField() {
  const group = useRef<THREE.Group>(null);
  const { value } = useScrollBand(0.55, 0.78, 0.06);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.08;
    group.current.scale.setScalar(value.current);
  });

  return (
    <group ref={group} position={[0, 0, -3]}>
      {Array.from({ length: CLUSTER_COUNT }, (_, i) => (
        <GlowGem key={i} index={i} total={CLUSTER_COUNT} />
      ))}
    </group>
  );
}
