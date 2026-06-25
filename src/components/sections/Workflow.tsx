'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { workflow } from '@/data/content';

export default function Workflow() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.workflow__reveal', {
        y: 80,
        opacity: 0,
        rotateX: 10,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.workflow__reveal', start: 'top 82%' },
      });

      gsap.utils.toArray<HTMLElement>('.workflow-card').forEach((el, index) => {
        gsap.to(el, {
          y: index % 2 ? -44 : 44,
          rotateZ: index % 2 ? -1.5 : 1.5,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="workflow" className="section" ref={sectionRef}>
      <div className="container">
        <div className="workflow__reveal">
          <p className="eyebrow">Workflow Rewrite</p>
          <h2>Next.js + R3F + GSAP + Lenis + GLSL.</h2>
        </div>

        <div className="workflow-grid">
          {workflow.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              className="workflow-card"
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
            >
              <span className="workflow-card__step">0{index + 1}</span>
              <Icon className="workflow-card__icon" />
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
