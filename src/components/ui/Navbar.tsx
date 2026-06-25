'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { navLinks } from '@/data/content';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => setOpen(false);

  return (
    <motion.nav
      className={`nav${scrolled ? ' nav--scrolled' : ''}`}
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#hero" className="logo">
        L<span>V</span>
        <small>3D</small>
      </a>

      {/* Desktop links */}
      <div className="nav__links">
        {navLinks.map((item) => (
          <a key={item} href={`#${item}`} className="nav__link">
            {item}
          </a>
        ))}
        <ThemeToggle />
      </div>

      {/* Mobile toggle */}
      <button className="nav__menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X /> : <Menu />}
      </button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((item) => (
              <a key={item} href={`#${item}`} onClick={handleClick} className="nav__link">
                {item}
              </a>
            ))}
            <ThemeToggle />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
