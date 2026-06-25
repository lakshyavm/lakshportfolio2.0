'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { particleVertex, particleFragment } from './shaders/common';

/**
 * Pick a particle count appropriate for the device.
 * Fewer points on small screens / weaker GPUs keeps the frame rate up.
 */
function pickCount() {
  if (typeof window === 'undefined') return 600;
  const w = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;
  const cores = navigator.hardwareConcurrency || 4;
  if (w < 700 || cores <= 4) return 500;
  if (dpr <= 1) return 700;
  return 900;
}

const palette = [
  new THREE.Color('#38bdf8'),
  new THREE.Color('#a855f7'),
  new THREE.Color('#22c55e'),
];

/**
 * GPU-instanced particle field that floats behind everything.
 * Points are distributed in a large volume; each bobs on its own phase.
 * Colors are sampled from the accent palette.
 */
export default function Particles() {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const COUNT = useMemo(() => pickCount(), []);

  const { positions, scales, colors } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const sc = new Float32Array(COUNT);
    const col = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4;

      sc[i] = 0.5 + Math.random() * 1.5;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, scales: sc, colors: col };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 6.0 },
      uPixelRatio: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2) },
      uOpacity: { value: 0.55 },
    }),
    [],
  );

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
      />
    </points>
  );
}
