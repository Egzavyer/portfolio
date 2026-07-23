import { useTranslation } from "react-i18next";
import { IconSun, IconMoon, IconMenu2, IconX } from "@tabler/icons-react";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import i18n from "../../i18n/i18n";
import { motion, useReducedMotion, type Variants } from "motion/react";

type NavbarProps = {
  heroSectionRef: RefObject<HTMLElement | null>;
  aboutSectionRef: RefObject<HTMLElement | null>;
  experienceSectionRef: RefObject<HTMLElement | null>;
  projectsSectionRef: RefObject<HTMLElement | null>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const scrollToSection = (sectionRef: RefObject<HTMLElement | null>) => {
  sectionRef.current?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
  sectionRef.current?.focus({ preventScroll: true });
};

export function Navbar({
  heroSectionRef,
  aboutSectionRef,
  experienceSectionRef,
  projectsSectionRef,
  isSidebarOpen,
  setIsSidebarOpen,
}: NavbarProps) {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isSidebarOpen) return;
    const sidebar = sidebarRef.current;
    const sidebarFocusable = sidebar?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const focusable = [
      ...(menuButtonRef.current ? [menuButtonRef.current] : []),
      ...(sidebarFocusable ? Array.from(sidebarFocusable) : []),
    ];
    focusable[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen, setIsSidebarOpen]);

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }

  // TODO: If more languages are supported, rename to changeLanguage and change to a dropdown
  function toggleLanguage() {
    if (language === "EN") {
      setLanguage("FR");
      i18n.changeLanguage("fr");
      document.documentElement.lang = "fr";
    } else {
      setLanguage("EN");
      i18n.changeLanguage("en");
      document.documentElement.lang = "en";
    }
  }

  const sidebarVariants: Variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: reduceMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 300,
        damping: 40,
      },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <nav aria-label={t("navbar.primary")}>
      <div className="fixed right-4 top-4 z-30 flex justify-end xl:hidden">
        <div className="flex items-center">
          {isSidebarOpen ? (
            <button
              ref={menuButtonRef}
              type="button"
              className="flex size-12 items-center justify-center rounded-xl border border-text/20 bg-primary-300/90 shadow-lg backdrop-blur-xl transition-colors hover:border-accent hover:text-accent"
              onClick={() => setIsSidebarOpen(false)}
              aria-expanded="true"
              aria-controls="mobile-menu"
              aria-label={t("navbar.closeMenu")}
            >
              <IconX aria-hidden="true" stroke={1} />
            </button>
          ) : (
            <button
              ref={menuButtonRef}
              type="button"
              className="flex size-12 items-center justify-center rounded-xl border border-text/20 bg-primary-300/90 shadow-lg backdrop-blur-xl transition-colors hover:border-accent hover:text-accent"
              onClick={() => setIsSidebarOpen(true)}
              aria-expanded="false"
              aria-controls="mobile-menu"
              aria-label={t("navbar.openMenu")}
            >
              <IconMenu2 aria-hidden="true" stroke={1} />
            </button>
          )}
        </div>
      </div>
      {isSidebarOpen ? (
        <motion.aside
          ref={sidebarRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("navbar.mobileMenu")}
          initial="closed"
          animate={isSidebarOpen ? "open" : "closed"}
          variants={sidebarVariants}
          className="fixed inset-y-0 right-0 z-20 flex w-full max-w-sm justify-center border-l border-text/15 bg-primary-300/95 px-8 shadow-2xl backdrop-blur-2xl xl:hidden"
        >
          <div className="flex flex-col items-center justify-center gap-12 text-center">
            <div className="text-xl font-semibold tracking-tight">
              <button
                className="rounded-lg px-3 py-2 transition-colors hover:text-accent"
                type="button"
                onClick={() => {
                  scrollToSection(heroSectionRef);
                  setIsSidebarOpen(false);
                }}
              >
                Xavier Lermusieaux
              </button>
            </div>
            <NavbarLinks
              aboutSectionRef={aboutSectionRef}
              experienceSectionRef={experienceSectionRef}
              projectsSectionRef={projectsSectionRef}
            />
            <NavbarButtons
              theme={theme}
              language={language}
              toggleLanguage={toggleLanguage}
              toggleTheme={toggleTheme}
            />
          </div>
        </motion.aside>
      ) : undefined}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed top-5 z-20 hidden w-full items-center justify-center px-8 xl:flex"
      >
        <div className="flex w-full max-w-7xl items-center justify-between rounded-2xl border border-text/15 bg-primary-300/85 px-5 py-3 shadow-xl shadow-primary-900/25 backdrop-blur-2xl">
          <div className="text-lg font-semibold tracking-tight">
            <button
              className="rounded-lg px-2 py-2 transition-colors hover:text-accent"
              type="button"
              onClick={() => scrollToSection(heroSectionRef)}
            >
              Xavier Lermusieaux
            </button>
          </div>
          <NavbarLinks
            aboutSectionRef={aboutSectionRef}
            experienceSectionRef={experienceSectionRef}
            projectsSectionRef={projectsSectionRef}
          />
          <NavbarButtons
            theme={theme}
            language={language}
            toggleLanguage={toggleLanguage}
            toggleTheme={toggleTheme}
          />
        </div>
      </motion.div>
    </nav>
  );
}

type NavbarLinksProps = {
  aboutSectionRef: RefObject<HTMLElement | null>;
  experienceSectionRef: RefObject<HTMLElement | null>;
  projectsSectionRef: RefObject<HTMLElement | null>;
};

function NavbarLinks({
  aboutSectionRef,
  experienceSectionRef,
  projectsSectionRef,
}: NavbarLinksProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center text-lg">
      <ul className="flex flex-col gap-8 xl:flex-row xl:gap-2">
        <NavbarLink label={t("navbar.about")} sectionRef={aboutSectionRef} />
        <NavbarLink
          label={t("navbar.experience")}
          sectionRef={experienceSectionRef}
        />
        <NavbarLink
          label={t("navbar.projects")}
          sectionRef={projectsSectionRef}
        />
      </ul>
    </div>
  );
}

type NavbarLinkProps = {
  label: string;
  sectionRef: RefObject<HTMLElement | null>;
};

function NavbarLink({ label, sectionRef }: NavbarLinkProps) {
  return (
    <li>
      <button
        className="rounded-lg px-4 py-2 transition-colors hover:bg-text/5 hover:text-accent"
        type="button"
        onClick={() => scrollToSection(sectionRef)}
      >
        {label}
      </button>
    </li>
  );
}

type NavbarButtonsProps = {
  language: "EN" | "FR";
  theme: "light" | "dark";
  toggleLanguage: () => void;
  toggleTheme: () => void;
};

function NavbarButtons({
  language,
  theme,
  toggleLanguage,
  toggleTheme,
}: NavbarButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center text-base">
      <ul className="flex flex-col items-center gap-6 xl:flex-row xl:gap-2">
        <li>
          <a
            href="https://drive.google.com/file/d/1roKglCaNw7mJe6H3dIWoeRh0uEqDQYDY/view"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-text/30 px-4 py-2 font-medium transition-all hover:border-accent hover:bg-accent hover:text-accent-contrast"
            aria-label={`${t("navbar.resume")} (${t("navbar.newTab")})`}
          >
            {t("navbar.resume")}
          </a>
        </li>
        <NavbarButton onClick={toggleLanguage} ariaLabel={`${language}: ${t("navbar.changeLanguage", { language: language === "EN" ? "Français" : "English" })}`}>
          {language}
        </NavbarButton>
        <NavbarButton onClick={toggleTheme} ariaLabel={t(theme === "light" ? "navbar.useDarkTheme" : "navbar.useLightTheme")}>
          {theme === "light" ? (
            <IconMoon aria-hidden="true" stroke={1} size={30} />
          ) : (
            <IconSun aria-hidden="true" stroke={1} size={30} />
          )}
        </NavbarButton>
      </ul>
    </div>
  );
}

type NavbarButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
};
function NavbarButton({
  onClick,
  ariaLabel,
  children,
  className,
}: NavbarButtonProps) {
  return (
    <li className="flex items-center">
      <button
        className={`${className ?? ""} flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-text/5 hover:text-accent`}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    </li>
  );
}
