'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Decrypted text — reveals text character by character with a random
 * glyph scramble before each character locks in. Similar to TextScramble
 * but with a typewriter-like sequential reveal feel. ReactBits-inspired.
 *
 * @param text         Final text to reveal.
 * @param revealTime   Total animation duration in ms (default 1500).
 * @param className    Optional CSS class.
 */
interface Props {
  text: string;
  revealTime?: number;
  className?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@!&';

function randomGlyph(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function DecryptedText({ text, revealTime = 1500, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(text.length > 0 ? text[0] + '█' : '');
  const hasRun = useRef(false);
  const resolved = useRef(0);

  const animate = useCallback(() => {
    if (resolved.current >= text.length) return;

    const startTime = performance.now();
    const charDelay = revealTime / text.length;
    const scrambleFrames = 6; // frames of noise per character

    let frame = 0;
    const tick = () => {
      frame++;

      if (frame % 2 === 0) {
        // Update scramble noise for unresolved characters.
        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (i <= resolved.current) {
            result += text[i];
          } else if (i === resolved.current + 1 && (frame % (scrambleFrames * 2) < scrambleFrames)) {
            result += randomGlyph();
          } else {
            result += ' ';
          }
        }
        // Cursor for current char.
        if (resolved.current < text.length) {
          result = result.slice(0, resolved.current + 1) + randomGlyph() + (frame % 4 < 2 ? '█' : ' ');
        }
        setDisplay(result);
      }

      // Advance resolved character.
      const elapsed = performance.now() - startTime;
      const newIndex = Math.min(Math.floor(elapsed / charDelay), text.length);

      if (newIndex > resolved.current) {
        resolved.current = newIndex;
      }

      if (resolved.current < text.length) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    requestAnimationFrame(tick);
  }, [text, revealTime]);

  useEffect(() => {
    if (inView && !hasRun.current) {
      hasRun.current = true;
      resolved.current = 0;
      animate();
    }
  }, [inView, animate]);

  return (
    <motion.span
      ref={ref}
      className={`decrypted-text ${className || ''}`}
      aria-label={text}
      role="text"
    >
      {display}
    </motion.span>
  );
}
