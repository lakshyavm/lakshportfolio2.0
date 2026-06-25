'use client';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamic import — the entire 3D tree only loads client-side.
const CameraRig = dynamic(() => import('./CameraRig'), { ssr: false });
const Particles = dynamic(() => import('./Particles'), { ssr: false });
const HeroCrystal = dynamic(() => import('./HeroCrystal'), { ssr: false });
const Ribbon = dynamic(() => import('./Ribbon'), { ssr: false });
const SkillsMorph = dynamic(() => import('./SkillsMorph'), { ssr: false });
const AchievementsField = dynamic(() => import('./AchievementsField'), { ssr: false });

/**
 * Fixed full-screen WebGL canvas behind all HTML content.
 * Starts hidden and fades in once the user scrolls past the hero
 * so the video background plays without GPU contention.
 */
export default function Experience() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.25;
      setActive(scrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="shader-scene"
      aria-hidden="true"
      style={{
        opacity: active ? 0.86 : 0,
        transition: 'opacity 0.8s ease',
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0.4, 5.5], fov: 54 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        frameloop={active ? 'always' : 'never'}
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* No solid background — let the video show through */}
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={2.8} color="#38bdf8" distance={20} />
        <pointLight position={[-4, -2, 3]} intensity={2.1} color="#a855f7" distance={20} />
        <pointLight position={[0, 2, -4]} intensity={1.4} color="#22c55e" distance={16} />

        <Stars radius={85} depth={45} count={1200} factor={4.8} saturation={0} fade speed={0.7} />

        <CameraRig />
        <Particles />
        <HeroCrystal />
        <Ribbon />
        <SkillsMorph />
        <AchievementsField />
      </Canvas>

      {/* Gradient overlay that blends the 3D canvas into the page bg */}
      <div className="shader-scene__overlay" />
    </div>
  );
}
