type Glitter = {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
};

const COLORS = ['#ff0', '#f0f', '#0ff', '#0f0', '#800080', '#fff'];
const GLITTER_COUNT = 150;

function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    pointerEvents: 'none',
    zIndex: '9999',
  });
  document.body.appendChild(canvas);
  resizeCanvas(canvas);
  window.addEventListener('resize', () => resizeCanvas(canvas));
  return canvas;
}

function resizeCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createGlitters(canvas: HTMLCanvasElement): Glitter[] {
  return Array.from({ length: GLITTER_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 2 + 0.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

function drawGlitters(
  ctx: CanvasRenderingContext2D,
  glitters: Glitter[],
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  glitters.forEach((g) => {
    ctx.fillStyle = g.color;
    ctx.fillRect(g.x, g.y, g.size, g.size);
    g.y += g.speed;
    if (g.y > canvas.height) {
      g.y = 0;
      g.x = Math.random() * canvas.width;
    }
  });
}

function animateGlitters(
  ctx: CanvasRenderingContext2D,
  glitters: Glitter[],
  canvas: HTMLCanvasElement
) {
  function animate() {
    drawGlitters(ctx, glitters, canvas);
    requestAnimationFrame(animate);
  }
  animate();
}

export function initGlitter() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  const canvas = createCanvas();
  const ctx = canvas.getContext('2d')!;
  const glitters = createGlitters(canvas);
  animateGlitters(ctx, glitters, canvas);
}

(window as any).initGlitter = initGlitter;
