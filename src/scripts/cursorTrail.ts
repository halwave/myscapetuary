import { rainbowCursor } from 'cursor-effects';

if (typeof window !== 'undefined') {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  const isTouch = 'ontouchstart' in window;

  if (!prefersReducedMotion && !isTouch) {
    new (rainbowCursor as any)({
      length: 13,
      size: 6,
      speed: 0.3,
      colors: ['#0f0', '#f0f', '#000', '#ff0', '#0ff', '#800080'],
    });
  }
}
