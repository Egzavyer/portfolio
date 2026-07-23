import { useTranslation } from "react-i18next";
import { Navbar } from "../components/Navbar";
import { IconArrowDown } from "@tabler/icons-react";
import { motion, useReducedMotion } from "motion/react";
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
  const reduceMotion = useReducedMotion();
  return (
    <header
      id="home"
      tabIndex={-1}
      className="flex min-h-svh w-full flex-col"
      ref={heroSectionRef}
    >
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
        className={`relative flex flex-1 flex-col items-center justify-center px-5 py-28 text-center sm:px-8 ${isSidebarOpen ? "pointer-events-none blur-xs" : "blur-none"}`}
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-5xl flex-col items-center"
        >
          <div
            aria-hidden="true"
            className="mb-7 h-1 w-16 rounded-full bg-accent sm:w-24"
          />
          <h1 className="text-balance text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            {t("hero.welcome")}
          </h1>
          <p className="mt-7 text-balance text-[clamp(1.1rem,2.5vw,1.75rem)] font-light tracking-[0.12em] text-text/80">
            {t("hero.subtitle")}
          </p>
        </motion.div>
        <motion.button
          type="button"
          onClick={() =>
            aboutSectionRef.current?.scrollIntoView({
              behavior: reduceMotion ? "auto" : "smooth",
            })
          }
          aria-label={t("navbar.about")}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="absolute bottom-8 flex size-12 items-center justify-center rounded-full border border-text/25 bg-primary/60 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent sm:bottom-10"
        >
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <IconArrowDown stroke={1.5} />
          </motion.span>
        </motion.button>
      </div>
    </header>
  );
}
