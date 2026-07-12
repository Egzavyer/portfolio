import { useTranslation } from "react-i18next";
import { Navbar } from "./Navbar";
import {
  useRef,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

type HeroProps = {
  aboutSectionRef: RefObject<HTMLDivElement | null>;
  experienceSectionRef: RefObject<HTMLDivElement | null>;
  projectsSectionRef: RefObject<HTMLDivElement | null>;
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
  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex flex-col w-full min-h-screen" ref={heroSectionRef}>
      <Navbar
        heroSectionRef={heroSectionRef}
        aboutSectionRef={aboutSectionRef}
        experienceSectionRef={experienceSectionRef}
        projectsSectionRef={projectsSectionRef}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        onPointerDown={() => handleTap()}
        className={`flex flex-1 flex-col items-center justify-center gap-8 text-center ${isSidebarOpen ? "blur-xs" : "blur-none"}`}
      >
        <div className="text-4xl xl:text-7xl">{t("hero.welcome")}</div>
        <div className="text-xl xl:text-4xl">{t("hero.subtitle")}</div>
      </div>
    </div>
  );
}
