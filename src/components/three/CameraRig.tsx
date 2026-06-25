'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Camera flythrough rig.
 *
 * As scroll goes 0 → 1 the camera travels along a spline of world-space
 * waypoints. Each waypoint corresponds to a section of the page. Between
 * waypoints the camera lerps smoothly so the user gets a cinematic
 * "flying through" feel while still being able to mouse-look.
 *
 * Pointer parallax reads R3F's built-in `state.pointer` (normalized -1..1),
 * so there's no manual event listener to leak.
 */

interface Waypoint {
  /** Scroll progress 0→1 where this waypoint sits. */
  at: number;
  position: [number, number, number];
  lookAt: [number, number, number];
}

const waypoints: Waypoint[] = [
  // Hero — wide establishing shot
  { at: 0.0, position: [0, 0.4, 5.5], lookAt: [0, 0, 0] },
  // About — pull back slightly, tilt down
  { at: 0.12, position: [-0.6, 0.2, 5], lookAt: [0, -0.2, 0] },
  // Workflow — orbit left
  { at: 0.25, position: [-2.4, 0.5, 4.2], lookAt: [-1, 0, 0] },
  // Skills — orbit right, closer
  { at: 0.38, position: [2.2, -0.2, 3.6], lookAt: [0.5, 0, 0] },
  // Experience — dolly in
  { at: 0.52, position: [0, -0.6, 2.8], lookAt: [0, 0.4, 0] },
  // Achievements — wide shot, pull back
  { at: 0.68, position: [0, 1.2, 4.8], lookAt: [0, 0, -1] },
  // Contact — close & personal
  { at: 0.85, position: [0.4, -0.1, 2.2], lookAt: [0.2, 0.1, 0] },
  // End — hold last position
  { at: 1.0, position: [0.3, -0.15, 2.0], lookAt: [0.2, 0.1, 0] },
];

function sampleWaypoints(scroll: number) {
  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    if (scroll >= a.at && scroll <= b.at) {
      const local = (scroll - a.at) / (b.at - a.at);
      // Smooth-step the blend for cinematic ease.
      const t = local * local * (3 - 2 * local);
      return {
        position: [
          THREE.MathUtils.lerp(a.position[0], b.position[0], t),
          THREE.MathUtils.lerp(a.position[1], b.position[1], t),
          THREE.MathUtils.lerp(a.position[2], b.position[2], t),
        ] as [number, number, number],
        lookAt: [
          THREE.MathUtils.lerp(a.lookAt[0], b.lookAt[0], t),
          THREE.MathUtils.lerp(a.lookAt[1], b.lookAt[1], t),
          THREE.MathUtils.lerp(a.lookAt[2], b.lookAt[2], t),
        ] as [number, number, number],
      };
    }
  }
  const last = waypoints[waypoints.length - 1];
  return { position: last.position, lookAt: last.lookAt };
}

export default function CameraRig() {
  const camera = useThree((s) => s.camera);
  const current = useRef({ px: 0, py: 0, pz: 0, lx: 0, ly: 0, lz: 0 });
  const { progress } = useScrollProgress();
  const reducedMotion = usePrefersReducedMotion();
  const parallaxAmount = reducedMotion ? 0 : 0.35;
  const lerpFactor = reducedMotion ? 0.3 : 0.04;

  useFrame((state) => {
    const scroll = progress.current;
    const { position, lookAt } = sampleWaypoints(scroll);

    // Mouse parallax — subtle tilt (0 when reduced-motion is requested).
    const parallaxX = state.pointer.x * parallaxAmount;
    const parallaxY = state.pointer.y * 0.25 * (reducedMotion ? 0 : 1);

    const c = current.current;
    c.px = THREE.MathUtils.lerp(c.px, position[0] + parallaxX, lerpFactor);
    c.py = THREE.MathUtils.lerp(c.py, position[1] + parallaxY, lerpFactor);
    c.pz = THREE.MathUtils.lerp(c.pz, position[2], lerpFactor);
    c.lx = THREE.MathUtils.lerp(c.lx, lookAt[0], lerpFactor);
    c.ly = THREE.MathUtils.lerp(c.ly, lookAt[1], lerpFactor);
    c.lz = THREE.MathUtils.lerp(c.lz, lookAt[2], lerpFactor);

    camera.position.set(c.px, c.py, c.pz);
    camera.lookAt(c.lx, c.ly, c.lz);
  });

  return null;
}
