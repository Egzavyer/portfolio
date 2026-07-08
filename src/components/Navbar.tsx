import { useTranslation } from "react-i18next";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useState } from "react";
import i18n from "../../i18n/i18n";

export function Navbar() {
  const { t } = useTranslation();
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
    <div className="flex justify-center items-center fixed w-full z-10 top-4">
      <div className=" flex justify-between items-center border border-text rounded-2xl p-4 w-11/12">
        <div className="text-xl">Xavier Lermusieaux</div>
        <div className="flex text-xl items-center">
          <ul className="flex flex-row gap-24">
            <NavbarLink label={t("navbar.about")} />
            <NavbarLink label={t("navbar.experience")} />
            <NavbarLink label={t("navbar.projects")} />
          </ul>
        </div>
        <div className="flex text-xl items-center">
          <ul className="flex flex-row gap-4">
            <NavbarButton
              onPointerDown={() => console.log("HERE")}
              children={t("navbar.resume")}
              className="border py-2 px-5 rounded"
            />
            <NavbarButton
              onPointerDown={() => toggleLanguage()}
              children={language}
            />
            <NavbarButton
              onPointerDown={() => toggleTheme()}
              children={
                theme === "light" ? (
                  <IconMoon stroke={1} size={30} />
                ) : (
                  <IconSun stroke={1} size={30} />
                )
              }
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

type NavbarLinkProps = {
  label: string;
};

function NavbarLink({ label }: NavbarLinkProps) {
  return <li className="hover:text-accent hover:cursor-pointer">{label}</li>;
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
