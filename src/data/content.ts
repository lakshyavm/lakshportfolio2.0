/**
 * Central content store.
 * All personal data lives here so sections stay presentational.
 * Edit this file to update the site — no component changes required.
 */

import {
  Layers3,
  Brain,
  Cloud,
  Workflow,
  Orbit,
  Cpu,
  Sparkles,
  Trophy,
  Crown,
  Camera,
  type LucideIcon,
} from 'lucide-react';

export const profile = {
  name: 'Lakshya Verma',
  firstName: 'Lakshya',
  lastName: 'Verma',
  role: 'Computer Science Undergraduate | AI & Data Science Innovator',
  kicker: 'Interactive 3D Portfolio',
  tagline: 'AI, data, WebGL, and motion design fused into immersive digital systems.',
  location: 'Jaipur, Rajasthan, India',
  email: 'lakshyavm@example.com',
  github: 'https://github.com/lakshyavm',
  linkedin: 'https://linkedin.com/',
};

export const education = {
  degree: 'B.Tech, AI & Data Science',
  school: 'Global Institute of Technology, Jaipur',
  period: 'Aug 2024 - Aug 2028',
};

export const about = {
  eyebrow: 'About',
  heading: 'AI-focused developer building cinematic interfaces.',
  paragraphs: [
    "I'm a Computer Science undergraduate majoring in Artificial Intelligence and Data Science. This portfolio is rebuilt as a WebGL-first experience where the content, 3D object, camera, and shader visuals respond to scroll.",
    'I combine modern frontend engineering with troubleshooting, data workflows, and creative direction to ship polished digital products.',
  ],
};

/** Headline stats shown as animated counters in the About section. */
export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 11, suffix: '+', label: 'Hackathon & Creative Wins' },
  { value: 4, suffix: '', label: 'Years CS Program' },
  { value: 5, suffix: '', label: 'National Competitions' },
  { value: 6, suffix: '', label: '3D / Motion Tech' },
];

export const skills: { title: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: '3D Frontend',
    icon: Layers3,
    items: ['Next.js', 'React', 'Three.js', 'React Three Fiber', 'GLSL', 'Framer Motion'],
  },
  {
    title: 'AI + Data',
    icon: Brain,
    items: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'ML Models', 'Analytics'],
  },
  {
    title: 'Systems + Cloud',
    icon: Cloud,
    items: ['AWS', 'Performance', 'Debugging', 'Responsive UX', 'Deployment', 'Teamwork'],
  },
];

export const workflow: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Workflow, title: 'Concept', text: 'Translate profile, achievements, and goals into a cinematic interaction map.' },
  { icon: Orbit, title: '3D Engine', text: 'React Three Fiber powers scroll-reactive objects, camera parallax, particle ribbons, and spatial labels.' },
  { icon: Cpu, title: 'Shader Pass', text: 'Custom GLSL creates holographic scanlines, fresnel glow, deformation, and scroll-color blending.' },
  { icon: Sparkles, title: 'Motion Layer', text: 'GSAP ScrollTrigger, Lenis, and Framer Motion drive smooth reveal, scrub, progress, and depth animations.' },
];

export const experience: { role: string; org: string; period: string; bullets: string[] }[] = [
  {
    role: 'Web Development Executive',
    org: 'SevaPoint.in',
    period: 'Sep 2025 - Present',
    bullets: [
      'Enhanced platform UX, navigation, and engagement.',
      'Managed content and digital assets with brand consistency.',
      'Maintained reliability through bug fixes and compatibility checks.',
    ],
  },
  {
    role: 'Project Intern',
    org: 'My Job Grow Internship Program',
    period: 'Jul 2025 - Aug 2025',
    bullets: [
      'Analyzed datasets with Pandas, NumPy, and Matplotlib.',
      'Built ML models for predictive analytics.',
      'Improved data handling, feature engineering, and visualization workflows.',
    ],
  },
];

export type AchievementCategory = 'hackathon' | 'creative';
export type Achievement = {
  category: AchievementCategory;
  title: string;
  detail: string;
  icon: LucideIcon;
};

export const achievements: Achievement[] = [
  { category: 'hackathon', title: 'Top 10 - CodeFiesta Hackathon 3.0', detail: 'GIT Jaipur', icon: Trophy },
  { category: 'hackathon', title: 'Management Team - CodeFiesta 4.0', detail: 'GIT Jaipur', icon: Trophy },
  { category: 'hackathon', title: 'National Competitor - Smart India Hackathon', detail: 'Top 15 GIT College, 2025', icon: Trophy },
  { category: 'hackathon', title: 'National Competitor - Bharatiya Antariksh Hackathon', detail: '2025', icon: Trophy },
  { category: 'hackathon', title: 'National Competitor - Adobe India Hackathon', detail: '2025', icon: Trophy },
  { category: 'creative', title: '1st Position - JIGYASA 2k25 Reel Contest', detail: 'Creative / Video', icon: Camera },
  { category: 'creative', title: '1st Position - JIGYASA 2k26 Frame Off', detail: 'Photography', icon: Camera },
  { category: 'creative', title: 'Champion - Valorant Esports, SKIT 2026', detail: '1st Place', icon: Crown },
  { category: 'creative', title: 'Champion - Valorant Esports, JECRC 2026', detail: '1st Place', icon: Crown },
  { category: 'creative', title: 'Champion - Valorant Esports, JIGYASA 2k26', detail: '1st Place', icon: Crown },
  { category: 'creative', title: '2nd Position - JIGYASA 2k25 Valorant', detail: 'Esports', icon: Trophy },
];

export const navLinks = ['about', 'workflow', 'skills', 'experience', 'achievements', 'contact'] as const;
export type NavLink = (typeof navLinks)[number];
