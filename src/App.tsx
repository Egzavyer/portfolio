import "../i18n/i18n";
import { Hero } from "./pages/Hero";
import { About } from "./pages/About";
import { useRef, useState } from "react";
import { Experience } from "./pages/Experience";
import { Projects } from "./pages/Projects";
import { Footer } from "./components/Footer";
import { Background } from "./components/Background";
import { Contact } from "./components/Contact";

function App() {
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const experienceSectionRef = useRef<HTMLElement | null>(null);
  const projectsSectionRef = useRef<HTMLElement | null>(null);
  const siteRef = useRef<HTMLDivElement>(null!);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  function handleTap() {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    } else {
      return;
    }
  }

  return (
    <Background siteRef={siteRef}>
      <a
        className="fixed left-3 top-3 z-100 translate-y-[-200%] rounded-lg bg-accent px-4 py-3 font-bold text-accent-contrast focus:translate-y-0"
        href="#main-content"
      >
        Skip to main content
      </a>
      <div
        ref={siteRef}
        className="flex min-h-screen w-full flex-col items-center overflow-x-clip font-saira text-text"
      >
        <Hero
          aboutSectionRef={aboutSectionRef}
          experienceSectionRef={experienceSectionRef}
          projectsSectionRef={projectsSectionRef}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          handleTap={handleTap}
        />
        <main id="main-content" tabIndex={-1} className="contents">
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
          <Contact />
        </main>
        <Footer />
      </div>
    </Background>
  );
}

export default App;
