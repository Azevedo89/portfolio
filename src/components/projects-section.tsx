import { projects } from "../data/projects";
import { AnimatedSection } from "./animated-section";
import { ProjectCard } from "./project-card";
import { SectionTitle } from "./section-title";

export function ProjectsSection() {
  return (
    <AnimatedSection id="projetos" className="section-spacing">
      <div className="container-shell">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Featured projects"
            title="Shipped projects, from research labs to live production sites."
            description="A mix of production websites running on custom domains and an R&D project from an academic internship. Each one taken end-to-end: architecture, build, deploy, and ownership of the final result."
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
