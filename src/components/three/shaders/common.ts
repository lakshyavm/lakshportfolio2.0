/**
 * Shared GLSL shader strings.
 * Centralized so vertex/fragment code is reusable across meshes and easy
 * to tweak (scanline density, fresnel power, deformation, palette blending).
 */

/* ------------------------------------------------------------------ *
 * Holographic shader used by the hero crystal + skills morph.
 * Vertex: scroll-reactive surface deformation (wave + scan + scroll swell).
 * Fragment: fresnel rim, animated stripes, 3-color palette blended by
 *           time and scroll, additive-ish alpha for the glow.
 * ------------------------------------------------------------------ */
export const holographicVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform float uTime;
  uniform float uScroll;
  uniform float uDistort;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    float wave = sin(position.y * 5.0 + uTime * 1.8) * 0.08 * uDistort;
    float scan = sin((position.x + position.z) * 8.0 + uScroll * 18.0) * 0.035 * uDistort;
    vec3 p = position + normal * (wave + scan + uScroll * 0.14);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

export const holographicFragment = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uOpacity;

  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.25);
    float stripes = smoothstep(0.36, 0.38, abs(sin(vUv.y * 44.0 + uTime * 2.2 + uScroll * 8.0)));

    vec3 color = mix(uColorA, uColorB, 0.5 + 0.5 * sin(uTime + vUv.x * 6.0));
    color = mix(color, uColorC, uScroll * 0.75);
    color += fresnel * 0.6;

    float alpha = (0.18 + fresnel * 0.48 + stripes * 0.18) * uOpacity;
    gl_FragColor = vec4(color, alpha);
  }
`;

/* ------------------------------------------------------------------ *
 * Particle field shader (GPU instanced points).
 * Vertex: each point bobs on its own phase; size attenuates with distance.
 * Fragment: soft circular sprite, no texture needed.
 * ------------------------------------------------------------------ */
export const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute vec3 aColor;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    vec3 p = position;
    p.y += sin(uTime * 0.6 + position.x * 1.5) * 0.4;
    p.x += cos(uTime * 0.4 + position.z * 1.2) * 0.3;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
  }
`;

export const particleFragment = /* glsl */ `
  varying vec3 vColor;
  uniform float uOpacity;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, alpha * uOpacity);
  }
`;
