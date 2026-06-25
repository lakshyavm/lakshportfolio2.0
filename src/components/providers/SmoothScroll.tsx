'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Wires Lenis smooth scrolling into GSAP's ticker so ScrollTrigger scrubs
 * in perfect sync with the smoothed scroll position. Also writes the
 * normalized progress (0 → 1) and velocity into the ScrollProvider refs so
 * the R3F camera flythrough and shaders stay frame-accurate.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const { progress, velocity } = useScrollProgress();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Respect reduced-motion: skip smoothing, but still expose raw progress.
    if (reducedMotion) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.current = max > 0 ? window.scrollY / max : 0;
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const onScroll = ({ scroll, limit, velocity: v }: { scroll: number; limit: number; velocity: number }) => {
      progress.current = limit > 0 ? scroll / limit : 0;
      velocity.current = v;
    };
    lenis.on('scroll', onScroll);
    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Keep triggers in sync after fonts/layout settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const refreshTimer = window.setTimeout(refresh, 600);

    return () => {
      lenis.off('scroll', onScroll);
      lenis.destroy();
      gsap.ticker.remove(ticker);
      window.removeEventListener('load', refresh);
      window.clearTimeout(refreshTimer);
    };
  }, [progress, velocity, reducedMotion]);

  return <>{children}</>;
}
