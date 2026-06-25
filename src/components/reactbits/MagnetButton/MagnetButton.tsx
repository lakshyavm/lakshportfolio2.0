'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Magnet button — the child element subtly follows the cursor when the
 * mouse is near it, creating a magnetic pull effect. ReactBits-inspired.
 *
 * @param children   The element to magnetize (e.g. a <button>).
 * @param strength    Pull strength in px (default 25).
 * @param className   Optional wrapper class.
 */
interface Props {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function MagnetButton({ children, strength = 25, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    // Distance-based falloff — stronger when closer.
    const dist = Math.sqrt(dx * dx + dy * dy);
    const factor = Math.max(0, 1 - dist / 200);
    x.set(dx * factor * 0.3);
    y.set(dy * factor * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`magnet-btn ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}
