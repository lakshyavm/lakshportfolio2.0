'use client';

import { useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Spotlight card — a radial gradient glow follows the mouse cursor
 * across the card surface. ReactBits-inspired interactive card.
 *
 * @param children Card content.
 * @param className Optional additional CSS class.
 * @param spotlightColor CSS color for the spotlight (defaults to accent).
 */
interface Props {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'var(--accent)',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty('--spot-x', `${x}%`);
    ref.current.style.setProperty('--spot-y', `${y}%`);
  };

  return (
    <motion.div
      ref={ref}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouse}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="spotlight-card__glow"
        style={{ background: `radial-gradient(circle at var(--spot-x, 20%) var(--spot-y, 10%), ${spotlightColor}, transparent 34%)` }}
      />
      <div className="spotlight-card__content">{children}</div>
    </motion.div>
  );
}
