'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { skills } from '@/data/content';

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.skills__reveal', {
        y: 80,
        opacity: 0,
        rotateX: 10,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skills__reveal', start: 'top 82%' },
      });

      gsap.utils.toArray<HTMLElement>('.skill-card').forEach((el, index) => {
        gsap.to(el, {
          y: index % 2 ? -36 : 36,
          rotateZ: index % 2 ? -1 : 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <div className="skills__reveal">
          <p className="eyebrow">Stack</p>
          <h2>Skills Matrix</h2>
        </div>

        <div className="cards">
          {skills.map(({ title, icon: Icon, items }, index) => (
            <motion.article
              className="card skill-card"
              key={title}
              whileHover={{ y: -12, rotateX: 5, rotateY: index % 2 ? -5 : 5 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Icon className="card__icon" />
              <h3>{title}</h3>
              <div className="chips">
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
