import { motion } from "framer-motion";
import { processSteps } from "../data/process";
import { AnimatedSection } from "./animated-section";
import { SectionTitle } from "./section-title";
import { Card } from "./ui/card";

const stepColors = ["#6D5DFC", "#22D3EE", "#A78BFA", "#34D399", "#F97316"];

export function ProcessSection() {
  return (
    <AnimatedSection className="section-spacing">
      <div className="container-shell">
        <SectionTitle
          eyebrow="How I build"
          title="A structured process from planning to production."
          description="Each step reduces noise and increases quality, from understanding requirements to shipping a working product."
        />

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.09, ease: "easeOut" }}
            >
              <Card className="group relative h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                {/* accent glow top */}
                <div
                  className="pointer-events-none absolute left-0 top-0 h-0.5 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${stepColors[index]}, transparent)` }}
                />

                <p
                  className="font-mono text-sm tracking-[0.24em]"
                  style={{ color: stepColors[index] }}
                >
                  {step.number}
                </p>
                <h3 className="mt-6 font-display text-2xl text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
