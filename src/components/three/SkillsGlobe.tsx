import { useEffect, useMemo, useRef, useState } from "react";

const PALETTE = ["#6D5DFC", "#22D3EE", "#A78BFA", "#34D399", "#F97316"];
const RADIUS = 155;

export function SkillsGlobe({ skills }: { skills: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const positions = useMemo(() => {
    const phi = Math.PI * (3 - Math.sqrt(5));
    return skills.map((_, i) => {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      return {
        x: Math.cos(theta) * r * RADIUS,
        y: y * RADIUS,
        z: Math.sin(theta) * r * RADIUS,
      };
    });
  }, [skills.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full" style={{ perspective: "650px" }}>
      {/* Pure CSS animation — zero JS, GPU-accelerated. Paused when offscreen. */}
      <div
        className="absolute inset-0 skill-globe-spin"
        style={{
          transformStyle: "preserve-3d",
          animationPlayState: visible ? "running" : "paused",
        }}
      >
        {skills.map((skill, i) => {
          const { x, y, z } = positions[i];
          const color = PALETTE[i % PALETTE.length];
          return (
            <span
              key={skill}
              className="absolute whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px]"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px)`,
                borderColor: `${color}50`,
                backgroundColor: `${color}12`,
                color,
              }}
            >
              {skill}
            </span>
          );
        })}
      </div>
    </div>
  );
}
