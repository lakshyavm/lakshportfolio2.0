'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollBand } from './useScrollBand';

/**
 * Data ribbon — a flowing curve of trailing spheres that weaves through
 * the scene. Scroll-reactive: it drifts position as you scroll.
 * Visible in the hero-to-workflow band.
 */
export default function Ribbon() {
  const group = useRef<THREE.Group>(null);
  const labelsRef = useRef<THREE.Group>(null);
  const { value, progress } = useScrollBand(0, 0.35, 0.07);

  // 24 points (down from 42) — each is a Trail (separate render pass),
  // so cutting the count nearly halves the draw cost with no visible change.
  const points = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const t = i / 23;
        return new THREE.Vector3(
          (t - 0.5) * 8,
          Math.sin(t * Math.PI * 4) * 0.7,
          -1.8 + Math.cos(t * Math.PI * 2) * 0.25,
        );
      }),
    [],
  );

  useFrame((state) => {
    const v = value.current;
    const s = progress.current;
    if (!group.current) return;

    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.08 * v;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -1.2 + s * 1.8, 0.04);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, -s * 1.2, 0.04);
    group.current.scale.setScalar(v);

    if (labelsRef.current) {
      labelsRef.current.position.z = THREE.MathUtils.lerp(labelsRef.current.position.z, -0.8 - s * 1.3, 0.04);
      labelsRef.current.rotation.y = THREE.MathUtils.lerp(labelsRef.current.rotation.y, s * 0.5, 0.04);
      labelsRef.current.scale.setScalar(v);
    }
  });

  return (
    <>
      <group ref={group}>
        {points.map((point, index) => (
          <Trail key={index} width={0.7} length={5} color={index % 2 ? '#38bdf8' : '#a855f7'} attenuation={(t) => t * t}>
            <mesh position={point.toArray()}>
              <sphereGeometry args={[0.035 + (index % 5) * 0.008, 12, 12]} />
              <meshBasicMaterial color={index % 2 ? '#38bdf8' : '#a855f7'} />
            </mesh>
          </Trail>
        ))}
      </group>
      <group ref={labelsRef} position={[-2.15, -0.6, -1.2]}>
        {['AI', 'DATA', 'WEBGL', 'UX'].map((word, i) => (
          <Text key={word} position={[0, i * 0.42, 0]} fontSize={0.22} color={i % 2 ? '#a855f7' : '#38bdf8'} anchorX="left" anchorY="middle">
            {word}
          </Text>
        ))}
      </group>
    </>
  );
}
