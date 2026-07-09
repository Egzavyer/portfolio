import "../i18n/i18n";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { useRef } from "react";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";

function App() {
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const experienceSectionRef = useRef<HTMLDivElement | null>(null);
  const projectsSectionRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="min-h-screen w-full bg-primary text-text font-saira overflow-hidden">
      <Hero
        aboutSectionRef={aboutSectionRef}
        experienceSectionRef={experienceSectionRef}
        projectsSectionRef={projectsSectionRef}
      />
      <About aboutSectionRef={aboutSectionRef} />
      <Experience experienceSectionRef={experienceSectionRef} />
      <Projects projectsSectionRef={projectsSectionRef} />
    </div>
  );
}

export default App;
