'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollBand } from './useScrollBand';
import { holographicVertex, holographicFragment } from './shaders/common';

/**
 * Hero crystal — a large distorted icosahedron with holographic GLSL.
 * Visible roughly for the top 20% of the page (hero + about).
 */
export default function HeroCrystal() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const { value, progress } = useScrollBand(0, 0.22, 0.06);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color('#38bdf8') },
      uColorB: { value: new THREE.Color('#a855f7') },
      uColorC: { value: new THREE.Color('#22c55e') },
      uOpacity: { value: 1 },
      uDistort: { value: 1 },
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
      mesh.current.rotation.x = state.clock.elapsedTime * 0.18 + s * 3.2;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.28 + s * 4.8;
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, Math.sin(s * Math.PI * 2) * 1.25 * v, 0.045);
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, 0.2 - s * 0.7, 0.045);
      mesh.current.scale.setScalar(v);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.32} floatIntensity={0.7}>
      <mesh ref={mesh} position={[0, 0.25, 0]}>
        {/* Detail 5 is plenty — the GLSL deformation carries the visual
            interest. Detail 72 created millions of vertices for no gain. */}
        <icosahedronGeometry args={[1.65, 5]} />
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
