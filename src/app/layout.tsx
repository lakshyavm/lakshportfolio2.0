import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lakshya Verma | AI & Data Science Portfolio',
  description: '3D interactive portfolio of Lakshya Verma, AI and Data Science undergraduate, web developer, hackathon competitor, and creative technologist.',
  keywords: ['Lakshya Verma', 'AI', 'Data Science', 'Portfolio', 'Three.js', 'React', 'Next.js'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
