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
      <div className="flex justify-end fixed z-11 top-5 right-2 xl:hidden">
        <div className="flex items-center">
          {isSidebarOpen ? (
            <button
              ref={menuButtonRef}
              type="button"
              className="flex size-11 items-center justify-center rounded-lg"
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
              className="flex size-11 items-center justify-center rounded-lg"
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
          className="fixed z-10 w-9/12 h-full flex justify-center bg-primary-300 right-0 xl:hidden"
        >
          <div className="flex justify-center flex-col gap-12 items-center text-center">
            <div className="text-xl">
              <button
                className="hover:cursor-pointer hover:text-accent"
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
      <div className="hidden justify-center items-center fixed w-full z-10 top-4 xl:flex">
        <div className="flex justify-between items-center border border-text rounded-2xl p-4 w-11/12 bg-primary-300">
          <div className="text-xl">
            <button
              className="hover:cursor-pointer hover:text-accent"
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
      </div>
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
    <div className="flex text-xl items-center">
      <ul className="flex flex-col gap-12 xl:gap-24 xl:flex-row">
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
        className="hover:cursor-pointer hover:text-accent"
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
    <div className="flex text-xl items-center">
      <ul className="flex flex-col gap-12 items-center xl:flex-row xl:gap-4">
        <a
          href="https://drive.google.com/file/d/1roKglCaNw7mJe6H3dIWoeRh0uEqDQYDY/view"
          target="_blank"
          rel="noopener noreferrer"
          className="border py-2 px-5 rounded hover:bg-accent hover:text-accent-contrast hover:cursor-pointer"
          aria-label={`${t("navbar.resume")} (${t("navbar.newTab")})`}
        >
          {t("navbar.resume")}
        </a>
        <NavbarButton onClick={toggleLanguage} ariaLabel={t("navbar.changeLanguage", { language: language === "EN" ? "Français" : "English" })}>
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
        className={`${className ?? ""} flex min-h-11 min-w-11 items-center justify-center rounded-lg cursor-pointer`}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    </li>
  );
}
