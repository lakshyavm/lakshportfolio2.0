'use client';

import { useEffect, useMemo, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, MapPin, Mail, Trophy, Crown, Camera, Code2, Cloud, Brain, Menu, X, Sun, Moon, Send } from 'lucide-react';
import dynamic from 'next/dynamic';

const ShaderScene = dynamic(() => import('@/components/ShaderScene'), { ssr: false });

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

const skills = [
  { title: 'Technical Core', icon: Code2, items: ['Python', 'Java', 'C / C++', 'HTML', 'React', 'Next.js'] },
  { title: 'Cloud & Design', icon: Cloud, items: ['AWS', 'UI/UX', 'Web Design', 'Creative Direction', 'Performance'] },
  { title: 'Core Engineering', icon: Brain, items: ['Troubleshooting', 'Management', 'Critical Thinking', 'Teamwork', 'Communication'] },
];

const achievements = [
  ['hackathon', 'Top 10 — CodeFiesta Hackathon 3.0', 'GIT Jaipur', Trophy],
  ['hackathon', 'Management Team — CodeFiesta 4.0', 'GIT Jaipur', Trophy],
  ['hackathon', 'National Competitor — Smart India Hackathon', 'Top 15 GIT College, 2025', Trophy],
  ['hackathon', 'National Competitor — Bharatiya Antariksh Hackathon', '2025', Trophy],
  ['hackathon', 'National Competitor — Adobe India Hackathon', '2025', Trophy],
  ['creative', '1st Position — JIGYASA 2k25 Reel Contest', 'Creative / Video', Camera],
  ['creative', '1st Position — JIGYASA 2k26 Frame Off', 'Photography', Camera],
  ['creative', 'Champion — Valorant Esports, SKIT 2026', '1st Place', Crown],
  ['creative', 'Champion — Valorant Esports, JECRC 2026', '1st Place', Crown],
  ['creative', 'Champion — Valorant Esports, JIGYASA 2k26', '1st Place', Crown],
  ['creative', '2nd Position — JIGYASA 2k25 Valorant', 'Esports', Trophy],
] as const;

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'hackathon' | 'creative'>('all');
  const [typed, setTyped] = useState('');
  const tagline = 'Building intelligent, cinematic web experiences where data, design, and interaction meet.';

  const visibleAchievements = useMemo(() => achievements.filter(([cat]) => filter === 'all' || cat === filter), [filter]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker, .hero-title, .hero-subtitle, .hero-actions', { y: 36, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out' });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el, { y: 70, opacity: 0, rotateX: 8 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } });
      });
      gsap.utils.toArray<HTMLElement>('.parallax').forEach((el) => {
        gsap.to(el, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: el, scrub: true } });
      });
    });

    let i = 0;
    const timer = setInterval(() => {
      setTyped(tagline.slice(0, i));
      i += 1;
      if (i > tagline.length) clearInterval(timer);
    }, 30);

    return () => { clearInterval(timer); cancelAnimationFrame(rafId); ctx.revert(); lenis.destroy(); gsap.ticker.remove(updateLenis); };
  }, []);

  const nav = ['about', 'skills', 'experience', 'achievements', 'contact'];

  return (
    <main>
      <ShaderScene />
      <nav className="nav">
        <a href="#hero" className="logo">L<span>V</span></a>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        <div className={`links ${menuOpen ? 'open' : ''}`}>
          {nav.map((item) => <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">{theme === 'dark' ? <Sun /> : <Moon />}</button>
        </div>
      </nav>

      <section id="hero" className="hero section">
        <div className="hero-copy">
          <p className="hero-kicker">Hello, I&apos;m</p>
          <h1 className="hero-title">Lakshya <span>Verma</span></h1>
          <p className="hero-subtitle">Computer Science Undergraduate | AI & Data Science Innovator</p>
          <p className="typewriter">{typed}</p>
          <div className="socials">
            <a href="https://github.com/lakshyavm" target="_blank" rel="noreferrer" aria-label="GitHub profile"><GithubIcon /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><LinkedinIcon /></a>
          </div>
          <div className="hero-actions">
            <a className="btn primary" href="#achievements">View Work <ArrowDown size={18} /></a>
            <a className="btn" href="#contact">Let&apos;s Connect</a>
          </div>
        </div>
      </section>

      <section id="about" className="section reveal">
        <div className="container two-col">
          <div><p className="eyebrow">About</p><h2>AI-focused developer with a creative edge.</h2></div>
          <div className="glass"><p>I&apos;m a driven Computer Science undergraduate majoring in Artificial Intelligence and Data Science. I bridge modern web development with intelligent systems to create seamless, high-impact user experiences.</p><p>I thrive in technical troubleshooting, risk evaluation, and innovative problem-solving across responsive platforms, data workflows, and polished digital products.</p><div className="timeline"><strong>B.Tech, AI & Data Science</strong><span>Global Institute of Technology, Jaipur · Aug 2024 — Aug 2028</span></div></div>
        </div>
      </section>

      <section id="skills" className="section reveal">
        <div className="container"><p className="eyebrow">Stack</p><h2>Skills Matrix</h2><div className="cards">{skills.map(({ title, icon: Icon, items }) => <article className="card" key={title}><Icon className="card-icon" /><h3>{title}</h3><div className="chips">{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></div>
      </section>

      <section id="experience" className="section reveal">
        <div className="container"><p className="eyebrow">Experience</p><h2>Professional Momentum</h2><div className="experience"><article className="glass"><h3>Web Development Executive</h3><span>SevaPoint.in · Sep 2025 — Present</span><ul><li>Enhanced platform UX, navigation, and engagement.</li><li>Managed content and digital assets with brand consistency.</li><li>Maintained reliability through bug fixes and compatibility checks.</li></ul></article><article className="glass"><h3>Project Intern</h3><span>My Job Grow Internship Program · Jul 2025 — Aug 2025</span><ul><li>Analyzed datasets with Pandas, NumPy, and Matplotlib.</li><li>Built ML models for predictive analytics.</li><li>Improved data handling, feature engineering, and visualization workflows.</li></ul></article></div></div>
      </section>

      <section id="achievements" className="section reveal">
        <div className="container"><p className="eyebrow">Proof</p><h2>Achievements & Acclaim</h2><div className="tabs">{(['all','hackathon','creative'] as const).map(tab => <button className={filter === tab ? 'active' : ''} onClick={() => setFilter(tab)} key={tab}>{tab}</button>)}</div><div className="achievement-grid">{visibleAchievements.map(([cat, title, detail, Icon]) => <article className="achievement" key={title}><Icon /><small>{cat}</small><h3>{title}</h3><p>{detail}</p></article>)}</div></div>
      </section>

      <section id="contact" className="section reveal">
        <div className="container two-col"><div><p className="eyebrow">Contact</p><h2>Let&apos;s build something intelligent and cinematic.</h2><p className="contact-line"><MapPin /> Jaipur, Rajasthan, India</p><p className="contact-line"><Mail /> lakshyavm@example.com</p></div><form className="glass contact" action="mailto:lakshyavm@example.com"><input placeholder="Your name" required /><input placeholder="Your email" type="email" required /><textarea placeholder="Tell me about your project" rows={5} required /><button className="btn primary" type="submit">Send Message <Send size={18} /></button></form></div>
      </section>
    </main>
  );
}
