import "../i18n/i18n";
import { Hero } from "./pages/Hero";
import { About } from "./pages/About";
import { useRef, useState } from "react";
import { Experience } from "./pages/Experience";
import { Projects } from "./pages/Projects";
import { Footer } from "./components/Footer";

function App() {
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const experienceSectionRef = useRef<HTMLDivElement | null>(null);
  const projectsSectionRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  function handleTap() {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    } else {
      return;
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-primary text-text font-saira overflow-hidden">
      <Hero
        aboutSectionRef={aboutSectionRef}
        experienceSectionRef={experienceSectionRef}
        projectsSectionRef={projectsSectionRef}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleTap={handleTap}
      />
      <About
        aboutSectionRef={aboutSectionRef}
        isSidebarOpen={isSidebarOpen}
        handleTap={handleTap}
      />
      <Experience
        experienceSectionRef={experienceSectionRef}
        isSidebarOpen={isSidebarOpen}
        handleTap={handleTap}
      />
      <Projects
        projectsSectionRef={projectsSectionRef}
        isSidebarOpen={isSidebarOpen}
        handleTap={handleTap}
      />
      <Footer />
    </div>
  );
}

export default App;
