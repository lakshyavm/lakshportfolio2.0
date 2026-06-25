'use client';

import { createContext, useMemo, useRef, type ReactNode } from 'react';

export type ScrollContextValue = {
  /** Normalized scroll position 0 → 1 (top → bottom). Read inside useFrame. */
  progress: React.MutableRefObject<number>;
  /** Smoothed scroll velocity, useful for motion blur / streaks. */
  velocity: React.MutableRefObject<number>;
};

export const ScrollContext = createContext<ScrollContextValue | null>(null);

/**
 * Holds the scroll progress in refs (not state) so that the R3F render loop
 * and other imperative consumers can read the latest value each frame
 * without causing React re-renders.
 */
export default function ScrollProvider({ children }: { children: ReactNode }) {
  const progress = useRef(0);
  const velocity = useRef(0);
  const value = useMemo(() => ({ progress, velocity }), []);
  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}
