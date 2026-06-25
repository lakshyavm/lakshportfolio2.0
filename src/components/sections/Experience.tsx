'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { experience } from '@/data/content';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.exp__reveal', {
        y: 80,
        opacity: 0,
        rotateX: 10,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.exp__reveal', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <div className="container">
        <div className="exp__reveal">
          <p className="eyebrow">Experience</p>
          <h2>Professional Momentum</h2>
        </div>

        <div className="experience-grid">
          {experience.map((job, index) => (
            <motion.article
              className="glass exp-card"
              key={job.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.12, duration: 0.7 }}
            >
              <h3>{job.role}</h3>
              <span className="exp-card__org">{job.org} · {job.period}</span>
              <ul>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
