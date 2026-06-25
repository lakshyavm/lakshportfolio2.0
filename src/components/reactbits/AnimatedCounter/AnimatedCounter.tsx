'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Animated counter — counts from 0 to `value` when the element scrolls
 * into view. ReactBits-inspired stat display component.
 *
 * @param value The target number.
 * @param suffix Text after the number (e.g. "+", "%").
 * @param label Descriptive label shown below the number.
 * @param duration Animation duration in ms (default 2000).
 */
interface Props {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({ value, suffix = '', label, duration = 2000 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for satisfying deceleration.
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return (
    <motion.div
      ref={ref}
      className="animated-counter"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <span className="animated-counter__number">
        {count}
        {suffix}
      </span>
      <span className="animated-counter__label">{label}</span>
    </motion.div>
  );
}
