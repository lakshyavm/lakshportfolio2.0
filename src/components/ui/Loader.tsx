'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Intro preloader with animated counter.
 * Once 100% is reached, the overlay dissolves and the site becomes
 * interactive.
 */
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frame: number;
    let value = 0;

    const tick = () => {
      value += 1 + Math.random() * 2;
      if (value >= 100) {
        value = 100;
        setCount(100);
        // Hold at 100 for a moment then fade out.
        window.setTimeout(() => {
          setVisible(false);
          window.setTimeout(onComplete, 600);
        }, 400);
        return;
      }
      setCount(Math.floor(value));
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="loader__count">{count}%</span>
          <div className="loader__bar">
            <motion.div
              className="loader__bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.1, ease: 'linear' as const }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
