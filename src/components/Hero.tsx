import { useTranslation } from "react-i18next";
import { Navbar } from "./Navbar";
import type { RefObject } from "react";

type HeroProps = {
  aboutSectionRef: RefObject<HTMLDivElement | null>;
  experienceSectionRef: RefObject<HTMLDivElement | null>;
  projectsSectionRef: RefObject<HTMLDivElement | null>;
};

export function Hero({
  aboutSectionRef,
  experienceSectionRef,
  projectsSectionRef,
}: HeroProps) {
  // TODO: add some background images like trees or some kind of scenery, forest for dark mode and mountain for light mode
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar
        aboutSectionRef={aboutSectionRef}
        experienceSectionRef={experienceSectionRef}
        projectsSectionRef={projectsSectionRef}
      />
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="text-7xl">{t("hero.welcome")}</div>
        <div className="text-4xl">{t("hero.subtitle")}</div>
      </div>
    </div>
  );
}
