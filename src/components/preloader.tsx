import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let raf = 0;
    let start = performance.now();
    const duration = 1100;

    const tick = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 2);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        const settle = setTimeout(() => setHidden(true), 220);
        return () => clearTimeout(settle);
      }
    };

    const onReady = () => {
      start = performance.now();
      raf = requestAnimationFrame(tick);
    };

    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onReady);
    };
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const t = setTimeout(() => setRemoved(true), 600);
    return () => clearTimeout(t);
  }, [hidden]);

  if (removed) return null;

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0d12] transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,93,252,0.12),transparent_55%)]" />

      <div className="relative flex w-full max-w-xs flex-col items-center gap-7 px-6">
        {/* Mark */}
        <div className="relative flex h-14 w-14 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-accent/30" />
          <span className="absolute inset-0 rounded-full border-t border-accent animate-spin [animation-duration:1.4s]" />
          <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-accent">GA</span>
        </div>

        {/* Name */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-foreground">
            Gonçalo Azevedo
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] text-muted">
            Software Engineer
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="relative h-px w-full overflow-hidden bg-white/10">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/60 via-accent to-cyan-400"
              style={{ width: `${progress}%`, transition: "width 120ms linear" }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[9px] tracking-[0.22em] text-muted">
            <span>LOADING</span>
            <span>{String(progress).padStart(3, "0")}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
