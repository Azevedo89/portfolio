import { useEffect, useRef } from "react";

const CHARS = "01{}[]()<>=;:.#/\\|&*+-ABCDEFabcdef";
const TARGET_FPS = 14;
const FRAME_MS = 1000 / TARGET_FPS;
const TRAIL = 2;

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const fontSize = 16;
    let drops: number[] = [];
    let animId: number;
    let lastFrame = 0;
    let paused = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = (timestamp: number) => {
      animId = requestAnimationFrame(draw);
      if (paused || timestamp - lastFrame < FRAME_MS) return;
      lastFrame = timestamp;

      ctx.fillStyle = "rgba(11, 13, 18, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * fontSize;
        if (y < 0) { drops[i] += 0.5; continue; }

        ctx.fillStyle = "#a8f0c6";
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * fontSize, y);

        for (let t = 1; t <= TRAIL; t++) {
          ctx.fillStyle = `rgba(0,200,65,${(1 - t / TRAIL) * 0.4})`;
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * fontSize, y - t * fontSize);
        }

        if (y > canvas.height && Math.random() > 0.98) drops[i] = 0;
        drops[i] += 0.5;
      }
    };

    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 opacity-[0.06]"
      style={{ zIndex: 0 }}
      aria-hidden
    />
  );
}
