import { useEffect, useRef } from 'react';

export default function Confetti({ fire }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!fire) return;
    const cv = ref.current;
    if (!cv) return;
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    cv.style.display = 'block';
    const ctx = cv.getContext('2d');
    const colors = ['#f0625a', '#6c4ce0', '#ffd166', '#6f9e7f', '#c98a6b'];
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * cv.width,
      y: -10 - Math.random() * 80,
      r: Math.random() * 7 + 3,
      w: Math.random() * 14 + 4,
      c: colors[~~(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 3 + 2,
      vr: (Math.random() - 0.5) * 8,
      rot: Math.random() * 360,
    }));
    const t0 = Date.now();
    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      pieces.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.r / 2, p.w, p.r);
        ctx.restore();
        p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.vy += 0.08;
      });
      if (Date.now() - t0 < 4000) raf = requestAnimationFrame(tick);
      else cv.style.display = 'none';
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [fire]);

  return <canvas ref={ref} className="confetti-canvas pointer-events-none fixed inset-0 z-[999] hidden" />;
}
