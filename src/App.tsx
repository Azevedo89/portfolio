import { AboutSection } from "./components/about-section";
import { ContactSection } from "./components/contact-section";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";
import { Preloader } from "./components/preloader";
import { ProcessSection } from "./components/process-section";
import { ProjectsSection } from "./components/projects-section";
import { ResumeSection } from "./components/resume-section";
import { StackSection } from "./components/stack-section";
import { MatrixRain } from "./components/three/MatrixRain";

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Preloader />

      {/* Matrix rain — global background */}
      <MatrixRain />

      {/* Radial ambient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(109,93,252,0.1),transparent_26%),radial-gradient(circle_at_left_center,rgba(34,211,238,0.06),transparent_20%)]" />

      <Navbar />
      <main>
        <Hero />
        <ProjectsSection />
        <AboutSection />
        <ResumeSection />
        <ProcessSection />
        <StackSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
