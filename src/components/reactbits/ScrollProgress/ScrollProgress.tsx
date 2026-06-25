'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll progress indicator — a thin horizontal bar at the top of the page
 * that fills as the user scrolls. Alternative to the main ProgressBar with
 * a different visual treatment (glow + pulse).
 *
 * ReactBits-inspired variant with an animated gradient glow.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.div
        className="scroll-progress__bar"
        style={{ scaleX, transformOrigin: 'left' }}
      />
      <motion.div
        className="scroll-progress__glow"
        style={{ scaleX, transformOrigin: 'left' }}
      />
    </div>
  );
}
