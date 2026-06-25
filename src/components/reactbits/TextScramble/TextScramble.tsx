'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Text scramble effect — characters cycle through random glyphs before
 * settling on the final text. ReactBits-inspired decode animation.
 *
 * @param text  The final string to reveal.
 * @param speed Frames between character updates (lower = faster).
 * @param className Optional CSS class.
 */
interface Props {
  text: string;
  speed?: number;
  className?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function TextScramble({ text, speed = 2, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const charIndex = useRef(0);
  const resolved = useRef(false);

  const animate = useCallback(() => {
    if (resolved.current) return;

    const elapsed = ++frameRef.current;
    const totalFrames = text.length * speed;

    if (elapsed >= totalFrames) {
      setDisplay(text);
      resolved.current = true;
      return;
    }

    // Determine how many characters have "locked" so far.
    charIndex.current = Math.min(Math.floor(elapsed / speed), text.length);
    let result = '';
    for (let i = 0; i < text.length; i++) {
      if (i < charIndex.current || text[i] === ' ') {
        result += text[i];
      } else {
        result += randomChar();
      }
    }
    setDisplay(result);

    requestAnimationFrame(animate);
  }, [text, speed]);

  useEffect(() => {
    if (inView && !resolved.current) {
      frameRef.current = 0;
      charIndex.current = 0;
      requestAnimationFrame(animate);
    }
  }, [inView, animate]);

  // Reset when text changes (e.g. re-renders).
  useEffect(() => {
    resolved.current = false;
    frameRef.current = 0;
    charIndex.current = 0;
    setDisplay(text);
  }, [text]);

  return (
    <motion.span
      ref={ref}
      className={`text-scramble ${className || ''}`}
      aria-label={text}
      role="text"
    >
      {display}
    </motion.span>
  );
}
