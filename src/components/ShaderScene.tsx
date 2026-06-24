'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Hologram() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uColorA: { value: new THREE.Color('#2563eb') }, uColorB: { value: new THREE.Color('#8b5cf6') } }), []);
  useFrame((state) => {
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.45} floatIntensity={0.9}>
      <mesh position={[1.8, 0.15, 0]} rotation={[0.75, 0.25, 0.15]}>
        <icosahedronGeometry args={[1.8, 48]} />
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          transparent
          wireframe
          vertexShader={`varying vec2 vUv; varying vec3 vNormal; uniform float uTime; void main(){ vUv=uv; vNormal=normal; vec3 p=position + normal * sin(position.y*4.0 + uTime*1.8)*0.055; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }`}
          fragmentShader={`varying vec2 vUv; varying vec3 vNormal; uniform float uTime; uniform vec3 uColorA; uniform vec3 uColorB; void main(){ float pulse=0.55+0.45*sin(uTime+vUv.y*8.0); vec3 color=mix(uColorA,uColorB,pulse); float fresnel=pow(1.0-abs(vNormal.z),2.0); gl_FragColor=vec4(color,0.22+fresnel*0.32); }`}
        />
      </mesh>
    </Float>
  );
}

export default function ShaderScene() {
  return (
    <div className="shader-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 1.6]}>
        <color attach="background" args={['#030712']} />
        <ambientLight intensity={0.7} />
        <pointLight position={[4, 4, 4]} intensity={2.5} color="#60a5fa" />
        <Stars radius={80} depth={35} count={1300} factor={4} saturation={0} fade speed={0.6} />
        <Hologram />
      </Canvas>
    </div>
  );
}
