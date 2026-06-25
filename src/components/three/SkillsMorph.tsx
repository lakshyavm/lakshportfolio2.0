'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollBand } from './useScrollBand';
import { holographicVertex, holographicFragment } from './shaders/common';

/**
 * Skills morph — a secondary holographic shape that appears in the skills
 * section band. Uses a torus knot for visual differentiation from the
 * hero icosahedron.
 */
export default function SkillsMorph() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const { value, progress } = useScrollBand(0.28, 0.50, 0.06);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color('#a855f7') },
      uColorB: { value: new THREE.Color('#38bdf8') },
      uColorC: { value: new THREE.Color('#22c55e') },
      uOpacity: { value: 1 },
      uDistort: { value: 0.7 },
    }),
    [],
  );

  useFrame((state) => {
    const v = value.current;
    const s = progress.current;
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
      material.current.uniforms.uScroll.value = s;
      material.current.uniforms.uOpacity.value = v;
    }
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.12 + s * 2;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.15;
      mesh.current.scale.setScalar(v * 0.85);
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} position={[2.5, 0, -2]}>
        <torusKnotGeometry args={[0.7, 0.28, 128, 32]} />
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          vertexShader={holographicVertex}
          fragmentShader={holographicFragment}
        />
      </mesh>
    </Float>
  );
}
