'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';

// ── Providers (order matters: ScrollProvider wraps everything) ──
import ScrollProvider from '@/components/providers/ScrollProvider';
import SmoothScroll from '@/components/providers/SmoothScroll';

// ── UI chrome ──
import Navbar from '@/components/ui/Navbar';
import ProgressBar from '@/components/ui/ProgressBar';
import Loader from '@/components/ui/Loader';
import VideoBackground from '@/components/ui/VideoBackground';

// ── 3D canvas (SSR disabled) ──
const Experience = dynamic(() => import('@/components/three/Experience'), { ssr: false });

// ── Sections ──
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Workflow from '@/components/sections/Workflow';
import Skills from '@/components/sections/Skills';
import ExperienceSection from '@/components/sections/Experience';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onComplete = useCallback(() => setLoaded(true), []);

  // Unlock scroll after loader finishes.
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loaded]);

  return (
    <ScrollProvider>
      <SmoothScroll>
        {/* Preloader */}
        <Loader onComplete={onComplete} />

        {/* 3D background — always behind HTML content */}
        <Experience />

        {/* Video background for hero section */}
        <VideoBackground src="/videos/hero-bg.mp4" />

        {/* Scanline overlay */}
        <div className="scanline" />

        {/* Scroll progress bar */}
        <ProgressBar />

        {/* Navigation */}
        <Navbar />

        {/* Page sections */}
        <main>
          <Hero />
          <About />
          <Workflow />
          <Skills />
          <ExperienceSection />
          <Achievements />
          <Contact />
        </main>
      </SmoothScroll>
    </ScrollProvider>
  );
}
