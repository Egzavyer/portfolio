import { useTranslation } from "react-i18next";
import { Navbar } from "../components/Navbar";
import {
  useRef,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

type HeroProps = {
  aboutSectionRef: RefObject<HTMLElement | null>;
  experienceSectionRef: RefObject<HTMLElement | null>;
  projectsSectionRef: RefObject<HTMLElement | null>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  handleTap: () => void;
};

export function Hero({
  aboutSectionRef,
  experienceSectionRef,
  projectsSectionRef,
  isSidebarOpen,
  setIsSidebarOpen,
  handleTap,
}: HeroProps) {
  // TODO: add some background images like trees or some kind of scenery, forest for dark mode and mountain for light mode
  const { t } = useTranslation();
  const heroSectionRef = useRef<HTMLElement | null>(null);
  return (
    <header id="home" tabIndex={-1} className="flex flex-col w-full min-h-screen" ref={heroSectionRef}>
      <Navbar
        heroSectionRef={heroSectionRef}
        aboutSectionRef={aboutSectionRef}
        experienceSectionRef={experienceSectionRef}
        projectsSectionRef={projectsSectionRef}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        onClick={handleTap}
        aria-hidden={isSidebarOpen || undefined}
        className={`flex flex-1 flex-col items-center justify-center gap-8 px-4 text-center ${isSidebarOpen ? "blur-xs pointer-events-none" : "blur-none"}`}
      >
        <h1 className="text-4xl xl:text-7xl">{t("hero.welcome")}</h1>
        <p className="text-xl xl:text-4xl">{t("hero.subtitle")}</p>
      </div>
    </header>
  );
}
