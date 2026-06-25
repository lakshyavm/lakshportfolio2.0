'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MapPin, Mail, Send } from 'lucide-react';
import { profile } from '@/data/content';
import MagnetButton from '@/components/reactbits/MagnetButton/MagnetButton';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.contact__reveal', {
        y: 80,
        opacity: 0,
        rotateX: 10,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__reveal', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="container two-col">
        <div className="contact__reveal">
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s build something intelligent, interactive, and cinematic.</h2>
          <p className="contact-line">
            <MapPin size={18} /> {profile.location}
          </p>
          <p className="contact-line">
            <Mail size={18} /> {profile.email}
          </p>
        </div>

        <motion.form
          className="glass contact-form"
          action={`mailto:${profile.email}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <input placeholder="Your name" required />
          <input placeholder="Your email" type="email" required />
          <textarea placeholder="Tell me about your project" rows={5} required />
          <MagnetButton>
            <button className="btn btn--primary" type="submit">
              Send Message <Send size={18} />
            </button>
          </MagnetButton>
        </motion.form>
      </div>
    </section>
  );
}
