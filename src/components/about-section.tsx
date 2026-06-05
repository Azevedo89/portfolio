import { Code2, Database, Layers3, Zap } from "lucide-react";
import { siteConfig } from "../data/site";
import { CircuitLines } from "./three/CircuitLines";
import { AnimatedSection } from "./animated-section";
import { SectionTitle } from "./section-title";
import { Card } from "./ui/card";

const icons = [Code2, Database, Layers3, Zap];

const terminalLines = [
  { text: "$ cat bio.json", color: "#a8f0c6" },
  { text: "{", color: "#94A3B8" },
  { text: '  "name": "Gonçalo Azevedo",', color: "#F5F7FA" },
  { text: '  "base": "Madeira, Portugal",', color: "#F5F7FA" },
  { text: '  "role": "Software Engineer",', color: "#F5F7FA" },
  { text: '  "focus": "web applications and product engineering",', color: "#22D3EE" },
  { text: '  "learning": ["systems", "architecture"],', color: "#6D5DFC" },
  { text: '  "building": "projects and practical experience"', color: "#34D399" },
  { text: "}", color: "#94A3B8" },
  { text: "$ █", color: "#a8f0c6" },
];

export function AboutSection() {
  return (
    <AnimatedSection id="sobre" className="section-spacing relative overflow-hidden">
      {/* Circuit board background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <CircuitLines className="absolute right-0 top-0 h-full w-[60%] translate-x-[10%]" />
      </div>

      <div className="container-shell relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          {/* Left: bio + strengths */}
          <div>
            <SectionTitle
              eyebrow="About me"
              title="A software engineer who cares about how things work and how they are built."
              description={siteConfig.description}
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {siteConfig.strengths.map((item, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <Card
                    key={item}
                    className="group h-full p-5 transition-colors duration-300 hover:border-accent/40"
                  >
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <p className="text-sm leading-relaxed text-muted group-hover:text-foreground/80 transition-colors">
                      {item}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right: terminal bio */}
          <div className="flex items-start">
            <div
              className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="ml-3 text-[10px] tracking-wider text-white/30">zsh ~/portfolio</span>
              </div>
              <div className="space-y-1 p-5 text-[12px] leading-6">
                {terminalLines.map((line, i) => (
                  <div key={i} style={{ color: line.color }}>
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
