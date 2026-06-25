import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lakshya Verma | AI & Data Science Portfolio',
  description:
    '3D interactive portfolio of Lakshya Verma — AI and Data Science undergraduate, web developer, hackathon competitor, and creative technologist.',
  keywords: ['Lakshya Verma', 'AI', 'Data Science', 'Portfolio', 'Three.js', 'React', 'Next.js'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect to font CDN for faster load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Inline theme script prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var t = localStorage.getItem('theme');
                if (t === 'light') {
                  document.documentElement.dataset.theme = 'light';
                } else {
                  document.documentElement.dataset.theme = 'dark';
                }
              } catch(e) {}
            })();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
