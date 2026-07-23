import "../i18n/i18n";
import { Hero } from "./pages/Hero";
import { lazy, Suspense, useRef, useState } from "react";
import { Footer } from "./components/Footer";
import { Background } from "./components/Background";
import { LazyMotion, MotionConfig } from "motion/react";

const About = lazy(() =>
  import("./pages/About").then(({ About }) => ({ default: About })),
);
const Experience = lazy(() =>
  import("./pages/Experience").then(({ Experience }) => ({
    default: Experience,
  })),
);
const Projects = lazy(() =>
  import("./pages/Projects").then(({ Projects }) => ({ default: Projects })),
);
const Contact = lazy(() =>
  import("./components/Contact").then(({ Contact }) => ({ default: Contact })),
);
const loadMotionFeatures = () =>
  import("./motionFeatures").then(({ default: features }) => features);

function App() {
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const experienceSectionRef = useRef<HTMLElement | null>(null);
  const projectsSectionRef = useRef<HTMLElement | null>(null);
  const contactSectionRef = useRef<HTMLElement | null>(null);
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
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
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
          contactSectionRef={contactSectionRef}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          handleTap={handleTap}
        />
        <main
          id="main-content"
          tabIndex={-1}
          inert={isSidebarOpen}
          className="contents"
        >
          <Suspense fallback={null}>
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
            <Contact sectionRef={contactSectionRef} />
          </Suspense>
        </main>
        <Footer />
      </div>
      </Background>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
