import { useEffect, useRef } from "react";

// Ambient card background: the web app's full-page canvas effects, scaled
// down to live behind one card's content. Same drawing code family as the
// app's AmbientBackground (plexus by default), minus the scroll parallax and
// pointer push — a card is small and static, the geometry alone carries the
// look. Paints at most 30fps, only while the card is on screen, and a single
// still frame when the viewer prefers reduced motion. Flow is left out on
// purpose: it paints its own opaque ground, which a card can't host.
export type AmbientEffect = "plexus" | "mesh" | "dots" | "contour" | "off";
export const AMBIENT_EFFECTS: AmbientEffect[] = ["plexus", "mesh", "dots", "contour", "off"];

const rand = (i: number, s: number) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

type RGB = [number, number, number];
type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, rgba: (a: number) => string) => void;

const plexus: Draw = (ctx, w, h, t, rgba) => {
  ctx.clearRect(0, 0, w, h);
  const count = Math.min(60, Math.max(14, Math.round((w * h) / 16000)));
  const th = Math.max(90, Math.min(w, h) * 0.34);
  const pts: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const vx = (rand(i, 3.1) - 0.5) * 0.016;
    const vy = (rand(i, 9.2) - 0.5) * 0.016;
    let x = (rand(i, 1.3) + vx * t) % 1;
    let y = (rand(i, 7.7) + vy * t) % 1;
    if (x < 0) x += 1;
    if (y < 0) y += 1;
    pts.push([x * w, y * h, 1.1 + rand(i, 5.5) * 1.4]);
  }
  ctx.lineWidth = 0.8;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i][0] - pts[j][0];
      const dy = pts[i][1] - pts[j][1];
      const d = Math.hypot(dx, dy);
      if (d < th) {
        ctx.strokeStyle = rgba((1 - d / th) * 0.2);
        ctx.beginPath();
        ctx.moveTo(pts[i][0], pts[i][1]);
        ctx.lineTo(pts[j][0], pts[j][1]);
        ctx.stroke();
      }
    }
  }
  for (const [x, y, r] of pts) {
    ctx.fillStyle = rgba(0.4);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 7);
    ctx.fill();
  }
};

const mesh: Draw = (ctx, w, h, t, rgba) => {
  ctx.clearRect(0, 0, w, h);
  const gx = Math.max(4, Math.round(w / 110));
  const gy = Math.max(3, Math.round(h / 110));
  const p: [number, number][] = [];
  for (let r = 0; r <= gy; r++)
    for (let i = 0; i <= gx; i++) {
      const ph = rand(i * 31 + r, 4.2) * 6.28;
      p.push([
        (i / gx) * w + Math.sin(t * 0.35 + ph) * 12,
        (r / gy) * h + Math.cos(t * 0.28 + ph * 1.7) * 10,
      ]);
    }
  const at = (i: number, r: number) => p[r * (gx + 1) + i];
  ctx.lineWidth = 0.7;
  ctx.strokeStyle = rgba(0.07);
  for (let r = 0; r < gy; r++)
    for (let i = 0; i < gx; i++) {
      const a = at(i, r), b = at(i + 1, r), c = at(i, r + 1), d = at(i + 1, r + 1);
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.lineTo(c[0], c[1]);
      ctx.closePath();
      ctx.moveTo(b[0], b[1]);
      ctx.lineTo(d[0], d[1]);
      ctx.lineTo(c[0], c[1]);
      ctx.stroke();
    }
  ctx.fillStyle = rgba(0.22);
  for (const [x, y] of p) {
    ctx.beginPath();
    ctx.arc(x, y, 1.4, 0, 7);
    ctx.fill();
  }
};

const contour: Draw = (ctx, w, h, t, rgba) => {
  ctx.clearRect(0, 0, w, h);
  const lines = Math.max(5, Math.round(h / 70));
  const spacing = h / (lines + 1);
  ctx.lineWidth = 1;
  for (let k = 0; k <= lines + 1; k++) {
    ctx.strokeStyle = rgba(k % 3 === 0 ? 0.14 : 0.08);
    ctx.beginPath();
    for (let x = 0; x <= w; x += 6) {
      const y =
        k * spacing +
        14 * Math.sin(x * 0.012 + t * 0.22 + k * 1.3) +
        8 * Math.sin(x * 0.025 - t * 0.15 + k * 2.1);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
};

const dots: Draw = (ctx, w, h, t, rgba) => {
  ctx.clearRect(0, 0, w, h);
  const s = 22;
  for (let y = s / 2; y < h; y += s)
    for (let x = s / 2; x < w; x += s) {
      const a = 0.07 + 0.16 * (0.5 + 0.5 * Math.sin(t * 0.7 + (x + y) * 0.014));
      ctx.fillStyle = rgba(a);
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, 7);
      ctx.fill();
    }
};

const DRAWS: Record<Exclude<AmbientEffect, "off">, Draw> = { plexus, mesh, contour, dots };

// The canvas' CSS color is set to the accent token, so reading the computed
// color hands us a parsed rgb() whatever form the theme wrote it in.
function accentOf(el: HTMLElement): RGB {
  const m = getComputedStyle(el).color.match(/(\d+(?:\.\d+)?)/g);
  if (m && m.length >= 3) return [Number(m[0]), Number(m[1]), Number(m[2])];
  return [96, 165, 250];
}

const FRAME_MS = 1000 / 30;

export default function Ambient({ effect }: { effect: AmbientEffect }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || effect === "off") return;
    const wrap = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!wrap || !ctx) return;
    const draw = DRAWS[effect];
    const [r, g, b] = accentOf(canvas);
    const rgba = (a: number) => `rgba(${r},${g},${b},${a})`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let last = 0;

    const frame = (now: number) => {
      raf = 0;
      if (!visible || w === 0) return;
      if (now - last >= FRAME_MS) {
        last = now;
        draw(ctx, w, h, now / 1000, rgba);
      }
      if (!reduced) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.round(rect.width);
      h = Math.round(rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      last = 0;
      kick();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    // Cards scrolled out of view (or on a hidden dashboard tab) stop
    // painting; entering the viewport resumes.
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) kick();
    });
    io.observe(wrap);
    resize();

    return () => {
      ro.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [effect]);

  if (effect === "off") return null;
  return (
    <div className="ambient" aria-hidden>
      <canvas ref={ref} />
    </div>
  );
}
