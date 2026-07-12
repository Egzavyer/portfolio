import { useTranslation } from "react-i18next";
import { IconSun, IconMoon, IconMenu2, IconX } from "@tabler/icons-react";
import { useState, type RefObject } from "react";
import i18n from "../../i18n/i18n";

type NavbarProps = {
  heroSectionRef: RefObject<HTMLDivElement | null>;
  aboutSectionRef: RefObject<HTMLDivElement | null>;
  experienceSectionRef: RefObject<HTMLDivElement | null>;
  projectsSectionRef: RefObject<HTMLDivElement | null>;
};

const scrollToSection = (sectionRef: RefObject<HTMLDivElement | null>) => {
  sectionRef.current?.scrollIntoView({
    behavior: "smooth",
  });
};

export function Navbar({
  heroSectionRef,
  aboutSectionRef,
  experienceSectionRef,
  projectsSectionRef,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState<"EN" | "FR">("EN");

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }

  // TODO: If more languages are supported, rename to changeLanguage and change to a dropdown
  function toggleLanguage() {
    if (language === "EN") {
      setLanguage("FR");
      i18n.changeLanguage("fr");
    } else {
      setLanguage("EN");
      i18n.changeLanguage("en");
    }
  }

  return (
    <div>
      <div className="flex justify-end fixed z-10 top-5 right-2 xl:hidden">
        <div className="flex items-center">
          {isOpen ? (
            <button
              type="button"
              className="outline-none"
              onPointerDown={() => setIsOpen(false)}
            >
              <IconX stroke={1} />
            </button>
          ) : (
            <button
              type="button"
              className="outline-none"
              onPointerDown={() => setIsOpen(true)}
            >
              <IconMenu2 stroke={1} />
            </button>
          )}
        </div>
      </div>
      {isOpen ? (
        <div className="fixed w-9/12 h-full flex justify-center bg-primary-300 right-0 xl:hidden">
          <div className="flex justify-center flex-col gap-12 items-center text-center">
            <div className="text-xl">
              <button
                className="hover:cursor-pointer hover:text-accent"
                type="button"
                onPointerDown={() => scrollToSection(heroSectionRef)}
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
      ) : undefined}
      <div className="hidden justify-center items-center fixed w-full z-10 top-4 xl:flex">
        <div className="flex justify-between items-center border border-text rounded-2xl p-4 w-11/12 bg-primary">
          <div className="text-xl">
            <button
              className="hover:cursor-pointer hover:text-accent"
              type="button"
              onPointerDown={() => scrollToSection(heroSectionRef)}
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
    </div>
  );
}

type NavbarLinksProps = {
  aboutSectionRef: RefObject<HTMLDivElement | null>;
  experienceSectionRef: RefObject<HTMLDivElement | null>;
  projectsSectionRef: RefObject<HTMLDivElement | null>;
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
  sectionRef: RefObject<HTMLDivElement | null>;
};

function NavbarLink({ label, sectionRef }: NavbarLinkProps) {
  return (
    <li>
      <button
        className="hover:cursor-pointer hover:text-accent"
        type="button"
        onPointerDown={() => scrollToSection(sectionRef)}
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
          className="border py-2 px-5 rounded hover:bg-accent hover:cursor-pointer"
        >
          {t("navbar.resume")}
        </a>
        <NavbarButton onPointerDown={() => toggleLanguage()}>
          {language}
        </NavbarButton>
        <NavbarButton onPointerDown={() => toggleTheme()}>
          {theme === "light" ? (
            <IconMoon stroke={1} size={30} />
          ) : (
            <IconSun stroke={1} size={30} />
          )}
        </NavbarButton>
      </ul>
    </div>
  );
}

type NavbarButtonProps = {
  children: React.ReactNode;
  onPointerDown: () => void;
  className?: string;
};
function NavbarButton({
  onPointerDown,
  children,
  className,
}: NavbarButtonProps) {
  return (
    <li className="flex items-center">
      <button
        className={`${className} cursor-pointer`}
        type="button"
        onPointerDown={onPointerDown}
      >
        {children}
      </button>
    </li>
  );
}
