import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { siteConfig } from "../data/site";
import { HeroScene } from "./three/HeroScene";
import { TerminalWidget } from "./three/TerminalWidget";
import { Button } from "./ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-24 sm:pt-24 lg:pt-20 xl:pt-24">
      <div className="container-shell">
        <div className="relative pb-8 pt-1 sm:pb-10 sm:pt-2 lg:pb-14 lg:pt-3 xl:pb-16 xl:pt-4">
          {/* Ambient blobs */}
          <div className="pointer-events-none absolute left-0 top-10 h-40 w-40 rounded-full bg-accent/12 blur-[100px] sm:top-14 sm:h-48 sm:w-48 lg:h-56 lg:w-56 lg:blur-[130px]" />
          <div className="pointer-events-none absolute right-0 top-6 h-32 w-32 rounded-full bg-cyan-400/8 blur-[90px] sm:right-4 sm:top-10 sm:h-40 sm:w-40 lg:h-48 lg:w-48 lg:blur-[130px]" />

          <div className="relative grid items-start gap-8 md:gap-10 lg:min-h-[calc(100vh-8.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)] lg:items-center xl:gap-14">
            {/* ── Left: text ─────────────────────────────────────────────── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-[680px] pt-0"
            >
              {/* Eyebrow */}
              <motion.div
                variants={itemVariants}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 sm:mb-6 sm:px-4"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted">
                  {siteConfig.name}
                </span>
              </motion.div>

              {/* Role tag */}
              <motion.p
                variants={itemVariants}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-accent/80 sm:text-[0.75rem] sm:tracking-[0.28em]"
              >
                <span className="text-white/20">{">"}</span> {siteConfig.role}
              </motion.p>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="mt-4 whitespace-pre-line font-display text-[3rem] font-bold leading-[0.9] tracking-[-0.05em] text-foreground min-[420px]:text-[3.35rem] sm:text-[4.25rem] md:max-w-[11ch] md:text-[4.8rem] lg:text-[5.4rem] xl:text-[6rem]"
              >
                {siteConfig.headline}
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="mt-5 max-w-[34rem] text-[0.98rem] leading-7 text-muted sm:mt-6 sm:text-base md:text-lg"
              >
                {siteConfig.subheadline}
              </motion.p>

              {/* Tech badges */}
              <motion.div
                variants={itemVariants}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="mt-6 flex flex-wrap gap-2.5 sm:gap-2"
              >
                {["Algorithms", "APIs", "Databases", "Systems", "TypeScript"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] text-muted/80 transition-colors hover:border-accent/40 hover:text-accent sm:text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4"
              >
                <a href="#projetos">
                  <Button className="w-full gap-2 px-7 py-3.5 sm:w-auto">
                    View projects
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a
                  href={`${import.meta.env.BASE_URL}cv.pdf`}
                  download="Goncalo-Azevedo-CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="secondary" className="w-full gap-2 px-7 py-3.5 sm:w-auto">
                    Download CV
                    <Download className="h-4 w-4" />
                  </Button>
                </a>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={itemVariants}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="mt-10 grid grid-cols-1 gap-5 border-t border-white/8 pt-6 sm:mt-12 sm:grid-cols-3 sm:gap-6 sm:pt-8"
              >
                {siteConfig.stats.map((stat) => (
                  <div key={stat.value}>
                    <p className="font-display text-lg font-semibold text-foreground">{stat.value}</p>
                    <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: 3D scene ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative mx-auto flex w-full max-w-[520px] flex-col gap-4 sm:max-w-[560px] lg:mx-0 lg:max-w-none lg:justify-center"
            >
              {/* Canvas 2D particle sphere */}
              <div className="relative h-[250px] w-full min-[420px]:h-[290px] sm:h-[340px] md:h-[380px] lg:h-[420px] xl:h-[520px]">
                <HeroScene />
                {/* glow behind sphere */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-accent/14 blur-[60px] sm:h-40 sm:w-40 sm:blur-[70px] lg:h-48 lg:w-48 lg:blur-[80px]" />
                </div>
              </div>

              {/* Terminal widget floats below sphere */}
              <TerminalWidget />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
