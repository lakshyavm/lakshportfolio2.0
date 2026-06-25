'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { achievements, type AchievementCategory } from '@/data/content';

const filters: Array<AchievementCategory | 'all'> = ['all', 'hackathon', 'creative'];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<AchievementCategory | 'all'>('all');

  const visible = filter === 'all' ? achievements : achievements.filter((a) => a.category === filter);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.achieve__reveal', {
        y: 80,
        opacity: 0,
        rotateX: 10,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.achieve__reveal', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" className="section" ref={sectionRef}>
      <div className="container">
        <div className="achieve__reveal">
          <p className="eyebrow">Proof</p>
          <h2>Achievements &amp; Acclaim</h2>
        </div>

        <div className="tabs">
          {filters.map((tab) => (
            <button
              key={tab}
              className={filter === tab ? 'active' : ''}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <LayoutGroup>
          <motion.div className="achievement-grid" layout>
            <AnimatePresence mode="popLayout">
              {visible.map((item) => (
                <motion.article
                  className="achievement"
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <item.icon className="achievement__icon" />
                  <small>{item.category}</small>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
