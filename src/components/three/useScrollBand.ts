'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useScrollProgress } from '@/hooks/useScrollProgress';

/**
 * Returns a helper that, given the current global scroll progress, produces
 * a 0→1 "visibility" envelope active only inside [start, end].
 *
 *   - ramps 0→1 across [start, start+ramp]
 *   - holds at 1
 *   - ramps 1→0 across [end-ramp, end]
 *
 * Consumers lerp position/scale/opacity with this value so each scene
 * gracefully appears/disappears as the camera flies past it.
 */
export function useScrollBand(start: number, end: number, ramp = 0.06) {
  const value = useRef(0);
  const { progress } = useScrollProgress();

  const band = useMemo(
    () => ({
      evaluate: (p: number) => {
        if (p < start || p > end) return 0;
        const local = (p - start) / (end - start);
        const fadeIn = THREE.MathUtils.clamp(local / ramp, 0, 1);
        const fadeOut = THREE.MathUtils.clamp((1 - local) / ramp, 0, 1);
        return Math.min(fadeIn, fadeOut);
      },
      // Midpoint of the band — used to anchor camera "rest" positions.
      center: (start + end) / 2,
    }),
    [start, end, ramp],
  );

  useFrame(() => {
    value.current = band.evaluate(progress.current);
  });

  return { value, band, progress };
}
