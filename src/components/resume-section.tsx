import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { education, experience } from "../data/resume";
import { AnimatedSection } from "./animated-section";
import { SectionTitle } from "./section-title";
import { Card } from "./ui/card";

export function ResumeSection() {
  return (
    <AnimatedSection id="percurso" className="section-spacing relative overflow-hidden">
      {/* Ambient blob */}
      <div className="pointer-events-none absolute left-1/2 top-32 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />

      <div className="container-shell relative">
        <SectionTitle
          eyebrow="Path"
          title="Experience and academic background."
          description="A timeline of where I've worked, what I've studied, and the tools I've shipped with along the way."
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-12">
          {/* ── Experience column ──────────────────────────────────────── */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Briefcase className="h-4 w-4" />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                  Experience
                </p>
                <h3 className="mt-0.5 font-display text-lg text-foreground">
                  Professional path
                </h3>
              </div>
            </div>

            <ol className="relative space-y-4 border-l border-white/8 pl-5">
              {experience.map((item) => (
                <li key={`${item.company}-${item.period}`} className="relative">
                  {/* Timeline dot */}
                  <span
                    className={`absolute -left-[26px] top-5 flex h-3 w-3 items-center justify-center rounded-full border ${
                      item.current
                        ? "border-accent bg-accent shadow-[0_0_10px_rgba(109,93,252,0.6)]"
                        : "border-white/20 bg-background"
                    }`}
                  >
                    {item.current && (
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    )}
                  </span>

                  <Card className="group p-5 transition-colors duration-300 hover:border-accent/40">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-display text-base font-semibold text-foreground">
                          {item.role}
                        </h4>
                        <p className="mt-0.5 text-sm text-muted">
                          {item.company}
                          <span className="text-muted/50"> · </span>
                          <span className="text-muted/70">{item.type}</span>
                        </p>
                      </div>
                      {item.current && (
                        <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-muted/70">
                      <span>{item.period}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                    </div>

                    {item.description && (
                      <p className="mt-3 text-[13px] leading-6 text-muted">{item.description}</p>
                    )}

                    {item.skills.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.skills.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-muted/80"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Education column ───────────────────────────────────────── */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                <GraduationCap className="h-4 w-4" />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400">
                  Education
                </p>
                <h3 className="mt-0.5 font-display text-lg text-foreground">
                  Academic background
                </h3>
              </div>
            </div>

            <ol className="relative space-y-4 border-l border-white/8 pl-5">
              {education.map((item) => (
                <li key={`${item.institution}-${item.period}`} className="relative">
                  <span
                    className={`absolute -left-[26px] top-5 flex h-3 w-3 items-center justify-center rounded-full border ${
                      item.current
                        ? "border-cyan-400 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                        : "border-cyan-400/40 bg-background"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        item.current ? "animate-pulse bg-white" : "bg-cyan-400/70"
                      }`}
                    />
                  </span>

                  <Card className="p-5 transition-colors duration-300 hover:border-cyan-400/40">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h4 className="font-display text-base font-semibold text-foreground">
                        {item.institution}
                      </h4>
                      {item.current && (
                        <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-400">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-muted">{item.degree}</p>
                    <p className="mt-2 font-mono text-[10px] text-muted/70">{item.period}</p>
                    {item.note && (
                      <p className="mt-2 text-[12px] italic text-muted/80">{item.note}</p>
                    )}
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
