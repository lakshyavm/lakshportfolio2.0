'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Animated aurora background — layers of soft, drifting gradient blobs.
 * Renders behind content for ambient motion.
 *
 * Based on the reactbits.dev Aurora component pattern.
 */
interface Blob {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  radius: number;
}

const BLOBS: Blob[] = [
  { x: 20, y: 30, size: 50, color: 'var(--accent)', speed: 0.008, angle: 0, radius: 18 },
  { x: 75, y: 50, size: 45, color: 'var(--accent2)', speed: 0.006, angle: 2, radius: 22 },
  { x: 50, y: 80, size: 55, color: 'var(--accent3)', speed: 0.007, angle: 4, radius: 16 },
];

function AuroraBlob({ blob }: { blob: Blob }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(blob.x);
  const y = useMotionValue(blob.y);
  const springX = useSpring(x, { stiffness: 40, damping: 20 });
  const springY = useSpring(y, { stiffness: 40, damping: 20 });

  const animate = useCallback(() => {
    const time = Date.now() * blob.speed;
    const nx = blob.x + Math.cos(blob.angle + time) * blob.radius;
    const ny = blob.y + Math.sin(blob.angle * 1.3 + time) * blob.radius;
    x.set(nx);
    y.set(ny);
    requestAnimationFrame(animate);
  }, [blob, x, y]);

  useEffect(() => {
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [animate]);

  return (
    <motion.div
      ref={ref}
      className="aurora__blob"
      style={{
        width: blob.size,
        height: blob.size,
        background: blob.color,
        left: springX,
        top: springY,
      }}
    />
  );
}

export default function AuroraBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="aurora">
      <div className="aurora__layer" aria-hidden="true">
        {BLOBS.map((blob, i) => (
          <AuroraBlob key={i} blob={blob} />
        ))}
      </div>
      <div className="aurora__content">{children}</div>
    </div>
  );
}
