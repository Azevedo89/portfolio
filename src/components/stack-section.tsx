import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { allSkills, skillGroups } from "../data/skills";
import { SkillsGlobe } from "./three/SkillsGlobe";
import { AnimatedSection } from "./animated-section";
import { SectionTitle } from "./section-title";
import { Card } from "./ui/card";

const categoryColors: Record<string, string> = {
  Frontend: "#6D5DFC",
  Backend: "#22D3EE",
  Database: "#34D399",
  "Tools & DevOps": "#F97316",
};

export function StackSection() {
  return (
    <AnimatedSection id="stack" className="section-spacing">
      <div className="container-shell">
        <SectionTitle
          eyebrow="Stack / Skills"
          title="Full-stack toolbox, from database to deployment."
          description="Organized by layer: frontend, backend, database, and tooling. Comfortable across the entire stack with a bias for clean TypeScript and real shipping."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* 3D skills globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative h-[300px] overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] min-[480px]:h-[360px] sm:h-[420px] lg:h-[500px]">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-56 w-56 rounded-full bg-accent/8 blur-[80px]" />
              </div>
              <SkillsGlobe skills={allSkills} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent" />
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted/50">
              drag to explore · auto-rotating
            </p>
          </motion.div>

          {/* Skill categories */}
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group, index) => {
              const color = categoryColors[group.category] ?? "#6D5DFC";
              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.09, ease: "easeOut" }}
                >
                  <Card className="h-full p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {group.category}
                      </h3>
                      <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted">
                        {group.items.length}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted transition-all duration-200 hover:border-current hover:text-foreground"
                          style={{ "--hover-color": color } as CSSProperties}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
