import { useTranslation } from "react-i18next";
import { IconSun, IconMoon, IconMenu2, IconX } from "@tabler/icons-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import i18n from "../../i18n/i18n";
import * as m from "motion/react-m";

type NavbarProps = {
  heroSectionRef: RefObject<HTMLElement | null>;
  aboutSectionRef: RefObject<HTMLElement | null>;
  experienceSectionRef: RefObject<HTMLElement | null>;
  projectsSectionRef: RefObject<HTMLElement | null>;
  contactSectionRef: RefObject<HTMLElement | null>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

type SectionId = "home" | "about" | "experience" | "projects" | "contact";

const scrollToSection = (
  sectionRef: RefObject<HTMLElement | null>,
  sectionId: SectionId,
) => {
  window.history.replaceState(null, "", `#${sectionId}`);
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
  contactSectionRef,
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
  const [language, setLanguage] = useState<"EN" | "FR">(() =>
    i18n.language === "fr" ? "FR" : "EN",
  );
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const navigationTargetRef = useRef<SectionId | null>(null);
  const navigationUnlockRef = useRef<number | null>(null);

  const activateSection = (sectionId: SectionId) => {
    navigationTargetRef.current = sectionId;
    setActiveSection(sectionId);
    if (navigationUnlockRef.current !== null) {
      window.clearTimeout(navigationUnlockRef.current);
    }
    navigationUnlockRef.current = window.setTimeout(() => {
      navigationTargetRef.current = null;
      navigationUnlockRef.current = null;
    }, 1400);
  };

  useEffect(
    () => () => {
      if (navigationUnlockRef.current !== null) {
        window.clearTimeout(navigationUnlockRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const sectionIds: SectionId[] = [
      "home",
      "about",
      "experience",
      "projects",
      "contact",
    ];
    const observed = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        const navigationTarget = navigationTargetRef.current;
        if (navigationTarget) {
          const reachedTarget = entries.some(
            (entry) =>
              entry.isIntersecting && entry.target.id === navigationTarget,
          );
          if (reachedTarget) {
            navigationTargetRef.current = null;
            if (navigationUnlockRef.current !== null) {
              window.clearTimeout(navigationUnlockRef.current);
              navigationUnlockRef.current = null;
            }
            setActiveSection(navigationTarget);
          }
          return;
        }
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id as SectionId | undefined;
        if (id) setActiveSection(id);
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 0.1, 0.25],
      },
    );
    const observeSections = () => {
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && !observed.has(section)) {
          observed.add(section);
          observer.observe(section);
        }
      }
    };
    observeSections();
    const mutationObserver = new MutationObserver(observeSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

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
      localStorage.setItem("language", "fr");
    } else {
      setLanguage("EN");
      i18n.changeLanguage("en");
      document.documentElement.lang = "en";
      localStorage.setItem("language", "en");
    }
  }

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
      <m.aside
          ref={sidebarRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("navbar.mobileMenu")}
          aria-hidden={!isSidebarOpen}
          inert={!isSidebarOpen}
          initial={false}
          animate={{
            x: isSidebarOpen ? 0 : "100%",
            opacity: isSidebarOpen ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          className={`fixed inset-y-0 right-0 z-20 flex w-full max-w-sm justify-center border-l border-text/15 bg-primary-300/95 px-8 shadow-2xl backdrop-blur-2xl xl:hidden ${
            isSidebarOpen
              ? ""
              : "pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-12 text-center">
            <div className="text-xl font-semibold tracking-tight">
              <a
                href="#home"
                className="rounded-lg px-3 py-2 transition-colors hover:text-accent"
                onClick={(event) => {
                  event.preventDefault();
                  activateSection("home");
                  setIsSidebarOpen(false);
                  requestAnimationFrame(() =>
                    scrollToSection(heroSectionRef, "home"),
                  );
                }}
              >
                Xavier Lermusieaux
              </a>
            </div>
            <NavbarLinks
              aboutSectionRef={aboutSectionRef}
              experienceSectionRef={experienceSectionRef}
              projectsSectionRef={projectsSectionRef}
              contactSectionRef={contactSectionRef}
              activeSection={activeSection}
              onActivate={activateSection}
              onNavigate={() => setIsSidebarOpen(false)}
            />
            <NavbarButtons
              theme={theme}
              language={language}
              toggleLanguage={toggleLanguage}
              toggleTheme={toggleTheme}
            />
          </div>
      </m.aside>
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed top-5 z-20 hidden w-full items-center justify-center px-8 xl:flex"
      >
        <div className="flex w-full max-w-7xl items-center justify-between rounded-2xl border border-text/15 bg-primary-300/85 px-5 py-3 shadow-xl shadow-primary-900/25 backdrop-blur-2xl">
          <div className="text-lg font-semibold tracking-tight">
            <a
              href="#home"
              className="rounded-lg px-2 py-2 transition-colors hover:text-accent"
              onClick={(event) => {
                event.preventDefault();
                activateSection("home");
                scrollToSection(heroSectionRef, "home");
              }}
            >
              Xavier Lermusieaux
            </a>
          </div>
          <NavbarLinks
            aboutSectionRef={aboutSectionRef}
            experienceSectionRef={experienceSectionRef}
            projectsSectionRef={projectsSectionRef}
            contactSectionRef={contactSectionRef}
            activeSection={activeSection}
            onActivate={activateSection}
          />
          <NavbarButtons
            theme={theme}
            language={language}
            toggleLanguage={toggleLanguage}
            toggleTheme={toggleTheme}
          />
        </div>
      </m.div>
    </nav>
  );
}

type NavbarLinksProps = {
  aboutSectionRef: RefObject<HTMLElement | null>;
  experienceSectionRef: RefObject<HTMLElement | null>;
  projectsSectionRef: RefObject<HTMLElement | null>;
  contactSectionRef: RefObject<HTMLElement | null>;
  activeSection: SectionId;
  onActivate: (sectionId: SectionId) => void;
  onNavigate?: () => void;
};

function NavbarLinks({
  aboutSectionRef,
  experienceSectionRef,
  projectsSectionRef,
  contactSectionRef,
  activeSection,
  onActivate,
  onNavigate,
}: NavbarLinksProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center text-lg">
      <ul className="flex flex-col gap-8 xl:flex-row xl:gap-2">
        <NavbarLink
          label={t("navbar.about")}
          sectionId="about"
          sectionRef={aboutSectionRef}
          isActive={activeSection === "about"}
          onActivate={onActivate}
          onNavigate={onNavigate}
        />
        <NavbarLink
          label={t("navbar.experience")}
          sectionId="experience"
          sectionRef={experienceSectionRef}
          isActive={activeSection === "experience"}
          onActivate={onActivate}
          onNavigate={onNavigate}
        />
        <NavbarLink
          label={t("navbar.projects")}
          sectionId="projects"
          sectionRef={projectsSectionRef}
          isActive={activeSection === "projects"}
          onActivate={onActivate}
          onNavigate={onNavigate}
        />
        <NavbarLink
          label={t("navbar.contact")}
          sectionId="contact"
          sectionRef={contactSectionRef}
          isActive={activeSection === "contact"}
          onActivate={onActivate}
          onNavigate={onNavigate}
        />
      </ul>
    </div>
  );
}

type NavbarLinkProps = {
  label: string;
  sectionId: SectionId;
  sectionRef: RefObject<HTMLElement | null>;
  isActive: boolean;
  onActivate: (sectionId: SectionId) => void;
  onNavigate?: () => void;
};

function NavbarLink({
  label,
  sectionId,
  sectionRef,
  isActive,
  onActivate,
  onNavigate,
}: NavbarLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onActivate(sectionId);
    onNavigate?.();
    requestAnimationFrame(() => scrollToSection(sectionRef, sectionId));
  };

  return (
    <li>
      <a
        href={`#${sectionId}`}
        aria-current={isActive ? "location" : undefined}
        className={`block rounded-lg px-4 py-2 transition-colors hover:bg-text/5 hover:text-accent ${
          isActive
            ? "bg-text/8 text-accent"
            : ""
        }`}
        onClick={handleClick}
      >
        {label}
      </a>
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
