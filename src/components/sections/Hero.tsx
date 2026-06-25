'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profile } from '@/data/content';

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.5v-1.74c-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.1-1.5-1.1-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.34 1.11 2.91.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.33.68.96.68 1.94v2.75c0 .28.18.6.69.5A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.91 1.64-1.86 3.38-1.86 3.61 0 4.28 2.38 4.28 5.47v6.29h-.02ZM5.32 7.42a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.03H3.54V8.98H7.1v11.47ZM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 44, rotateX: 8 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.75, ease: 'easeOut' as const } },
};

export default function Hero() {
  const [typed, setTyped] = useState('');
  const tagline = profile.tagline;
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.12]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTyped(tagline.slice(0, i));
      i += 1;
      if (i > tagline.length) clearInterval(timer);
    }, 24);
    return () => clearInterval(timer);
  }, [tagline]);

  return (
    <section id="hero" className="section section--hero">
      <motion.div
        className="hero__copy"
        style={{ y: heroY, opacity: heroOpacity }}
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.p variants={fadeUp} className="hero__kicker">
          {profile.kicker}
        </motion.p>
        <motion.h1 variants={fadeUp} className="hero__title">
          {profile.firstName} <span>{profile.lastName}</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="hero__subtitle">
          {profile.role}
        </motion.p>
        <motion.p variants={fadeUp} className="hero__typewriter">
          {typed}
        </motion.p>

        <motion.div variants={fadeUp} className="hero__socials">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <GithubIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            <LinkedinIcon />
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="hero__actions">
          <a className="btn btn--primary" href="#workflow">
            Explore Workflow <ArrowDown size={18} />
          </a>
          <a className="btn" href="#contact">
            Let&apos;s Connect
          </a>
        </motion.div>
      </motion.div>

      <div className="hero__scroll-hint">
        <span />
        Scroll to drive the 3D scene
      </div>
    </section>
  );
}
