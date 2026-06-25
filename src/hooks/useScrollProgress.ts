'use client';

import { useContext } from 'react';
import { ScrollContext, type ScrollContextValue } from '@/components/providers/ScrollProvider';

/**
 * Subscribe to the global normalized scroll progress (0 → 1).
 * The value is stored on a mutable ref so 3D useFrame loops can read it
 * every frame without triggering React re-renders.
 */
export function useScrollProgress(): ScrollContextValue {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    // Safe fallback before the provider mounts (e.g. during SSR).
    return { progress: { current: 0 }, velocity: { current: 0 } };
  }
  return ctx;
}
