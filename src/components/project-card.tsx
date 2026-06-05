import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useRef } from "react";
import type { Project } from "../data/projects";
import { Card } from "./ui/card";

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`h-full ${className ?? ""}`}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <TiltCard>
        <Card className="group h-full overflow-hidden p-0 transition-all duration-300 hover:border-white/20">
          {/* Top accent bar + label */}
          <div
            className="relative flex h-36 items-end px-6 pb-4"
            style={{
              background: `linear-gradient(135deg, ${project.glow}, transparent 70%)`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at top left, ${project.glow}, transparent 60%)`,
              }}
            />
            {/* Grid overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <span
              className="relative z-10 rounded-lg border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest"
              style={{
                borderColor: `${project.accent}40`,
                backgroundColor: `${project.accent}15`,
                color: project.accent,
              }}
            >
              {project.imageLabel}
            </span>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl text-foreground">{project.title}</h3>
              <div className="flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-colors hover:text-foreground"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-colors hover:text-foreground"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

            {/* Stack badges */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-muted/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Metrics */}
            <div className="mt-5 flex flex-wrap gap-2">
              {project.metrics.map((m) => (
                <span
                  key={m}
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: `${project.accent}18`,
                    color: project.accent,
                  }}
                >
                  {m}
                </span>
              ))}
            </div>

            <p className="mt-4 border-t border-white/8 pt-4 text-[11px] uppercase tracking-[0.2em] text-muted/60">
              {project.role}
            </p>
          </div>
        </Card>
      </TiltCard>
    </motion.div>
  );
}
