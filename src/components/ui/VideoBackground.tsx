'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * Looping fullscreen video background for the hero section.
 *
 * - Autoplay, muted, looped (required for autoplay in modern browsers).
 * - Fades out & pauses when the user scrolls past the hero to save GPU/CPU.
 * - Uses hardware-accelerated compositing (will-change, translateZ).
 *
 * @param src  Path to the video file (e.g. "/videos/hero-bg.mp4").
 */
export default function VideoBackground({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Fade out and pause video when user scrolls past hero
  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Start fading at 30% of viewport, fully hidden at 100%
      const fadeStart = vh * 0.3;
      const fadeEnd = vh;

      if (scrollY <= fadeStart) {
        container.style.opacity = '1';
        if (video.paused) video.play().catch(() => {});
      } else if (scrollY >= fadeEnd) {
        container.style.opacity = '0';
        if (!video.paused) video.pause();
      } else {
        const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        container.style.opacity = String(1 - progress);
        if (video.paused) video.play().catch(() => {});
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <div ref={containerRef} className="video-bg" aria-hidden="true">
      <video
        ref={videoRef}
        className="video-bg__video"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={(e) => { (e.target as HTMLVideoElement).playbackRate = 1.5; }}
      />
      {/* Gradient overlay for text readability */}
      <div className="video-bg__overlay" />
    </div>
  );
}
