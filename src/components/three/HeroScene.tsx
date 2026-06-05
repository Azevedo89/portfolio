import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type P3 = { x: number; y: number; z: number; r: number; g: number; b: number };

// ─── Constants ────────────────────────────────────────────────────────────────
const COUNT = 200;
const SPHERE_R = 0.72;
const CONN_SQ = 0.42 * 0.42;
const ROT_SPEED = 0.1; // rad/s
const FOV = 2.8;

// ─── Fibonacci sphere ─────────────────────────────────────────────────────────
function fibSphere(n: number, rad: number): P3[] {
  const phi = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y01 = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y01 * y01);
    const t = phi * i;
    const mix = (y01 + 1) / 2;
    return {
      x: Math.cos(t) * r * rad,
      y: y01 * rad,
      z: Math.sin(t) * r * rad,
      r: (109 / 255) * (1 - mix) + (34 / 255) * mix,
      g: (93 / 255) * (1 - mix) + (211 / 255) * mix,
      b: (252 / 255) * (1 - mix) + (238 / 255) * mix,
    };
  });
}

// ─── Rotation helpers ─────────────────────────────────────────────────────────
const rotY = (x: number, y: number, z: number, a: number): [number, number, number] => [
  x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a),
];
const rotX = (x: number, y: number, z: number, a: number): [number, number, number] => [
  x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a),
];

// ─── Cube geometry ────────────────────────────────────────────────────────────
const CV: [number, number, number][] = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];
const CE: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const CUBES = [
  { ox: -1.2, oy: 0.5,  oz: -0.4, s: 0.18, c: "#6D5DFC", sp: 0.38 },
  { ox:  1.1, oy: -0.4, oz: -0.5, s: 0.13, c: "#22D3EE", sp: 0.62 },
  { ox: -0.8, oy: -0.7, oz: -0.2, s: 0.10, c: "#6D5DFC", sp: 0.82 },
  { ox:  1.3, oy:  0.3, oz: -0.7, s: 0.16, c: "#22D3EE", sp: 0.33 },
  { ox: -1.1, oy: -0.2, oz: -0.7, s: 0.11, c: "#A78BFA", sp: 0.57 },
  { ox:  0.5, oy:  1.0, oz: -0.4, s: 0.08, c: "#6D5DFC", sp: 0.93 },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────
export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio, 2);
    let cw = 0, ch = 0;

    const resize = () => {
      cw = parent.clientWidth;
      ch = parent.clientHeight;
      // Setting width/height resets canvas state, so re-scale after
      canvas.width = Math.floor(cw * DPR);
      canvas.height = Math.floor(ch * DPR);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.scale(DPR, DPR);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Build static scene data
    const particles = fibSphere(COUNT, SPHERE_R);

    const pairs: [number, number][] = [];
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dz = particles[i].z - particles[j].z;
        if (dx * dx + dy * dy + dz * dz < CONN_SQ) pairs.push([i, j]);
      }
    }

    // Mouse
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // Projection
    const project = (x: number, y: number, z: number) => {
      const scale = Math.min(cw, ch) * 0.44;
      const pz = z + FOV;
      const p = FOV / Math.max(pz, 0.01);
      return {
        sx: cw / 2 + x * p * scale,
        sy: ch / 2 + y * p * scale,
        sz: p * 4,
        sa: Math.max(0, Math.min(1, 0.2 + p * 0.8)),
      };
    };

    let elapsed = 0, last = performance.now(), animId: number;
    let paused = false;
    let offscreen = false;
    const onVis = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(
      (entries) => { offscreen = !entries[0].isIntersecting; },
      { rootMargin: "100px" }
    );
    io.observe(canvas);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (paused || offscreen) { last = performance.now(); return; }

      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;

      const tY = elapsed * ROT_SPEED + mx * 0.45;
      const tX = my * 0.25;

      // Project all particles
      const proj = particles.map((p) => {
        let [px, py, pz] = rotY(p.x, p.y, p.z, tY);
        [px, py, pz] = rotX(px, py, pz, tX);
        const { sx, sy, sz, sa } = project(px, py, pz);
        return { sx, sy, sz, sa, r: p.r, g: p.g, b: p.b };
      });

      ctx.clearRect(0, 0, cw, ch);

      // All connection lines in a single batched draw call
      ctx.beginPath();
      ctx.strokeStyle = "rgba(109,93,252,0.13)";
      ctx.lineWidth = 0.5;
      for (const [i, j] of pairs) {
        ctx.moveTo(proj[i].sx, proj[i].sy);
        ctx.lineTo(proj[j].sx, proj[j].sy);
      }
      ctx.stroke();

      // Particles sorted back → front for correct depth
      proj
        .slice()
        .sort((a, b) => a.sa - b.sa)
        .forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, Math.max(0.5, p.sz), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${Math.round(p.r * 255)},${Math.round(p.g * 255)},${Math.round(p.b * 255)},${(p.sa * 0.9).toFixed(2)})`;
          ctx.fill();
        });

      // Wireframe cubes
      CUBES.forEach(({ ox, oy, oz, s, c, sp }) => {
        const cr = elapsed * sp;
        ctx.beginPath();
        ctx.strokeStyle = c;
        ctx.lineWidth = 0.55;
        ctx.globalAlpha = 0.28;

        for (const [vi, vj] of CE) {
          const drawV = (v: [number, number, number]) => {
            let [vx, vy, vz] = [v[0] * s, v[1] * s, v[2] * s];
            [vx, vy, vz] = rotY(vx, vy, vz, cr);
            [vx, vy, vz] = rotX(vx, vy, vz, cr * 0.7);
            [vx, vy, vz] = rotY(vx + ox, vy + oy, vz + oz, tY);
            [vx, vy, vz] = rotX(vx, vy, vz, tX);
            return project(vx, vy, vz);
          };
          const pa = drawV(CV[vi]), pb = drawV(CV[vj]);
          ctx.moveTo(pa.sx, pa.sy);
          ctx.lineTo(pb.sx, pb.sy);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}
