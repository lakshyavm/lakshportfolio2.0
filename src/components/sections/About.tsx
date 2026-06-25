'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { about, education, stats } from '@/data/content';
import AnimatedCounter from '@/components/reactbits/AnimatedCounter/AnimatedCounter';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.about__reveal', {
        y: 80,
        opacity: 0,
        rotateX: 10,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__reveal', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="container two-col depth-panel">
        <div className="about__reveal">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2>{about.heading}</h2>
        </div>

        <motion.div
          className="glass about__glass"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div className="about__stats">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>

          <div className="timeline">
            <strong>{education.degree}</strong>
            <span>{education.school} · {education.period}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
