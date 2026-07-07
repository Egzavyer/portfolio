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
    <div className="flex justify-between p-4 border border-text items-center rounded-2xl">
      <div className="text-xl">Xavier Lermusieaux</div>
      <div className="flex text-xl items-center">
        <ul className="flex flex-row gap-6">
          <li>{t("navbar.about")}</li>
          <li>{t("navbar.experience")}</li>
          <li>{t("navbar.projects")}</li>
        </ul>
      </div>
      <div className="flex text-xl items-center">
        <ul className="flex flex-row gap-4">
          <li className="flex items-center">
            <button
              className="border cursor-pointer py-2 px-5 rounded"
              type="button"
              onClick={() => console.log("HERE")}
            >
              {t("navbar.resume")}
            </button>
          </li>
          <li className="flex items-center">
            <button
              className="flex"
              type="button"
              onPointerDown={() => toggleLanguage()}
            >
              {language}
            </button>
          </li>
          <li className="flex items-center">
            <button
              type="button"
              onPointerDown={() => toggleTheme()}
              className="flex"
            >
              {theme === "light" ? (
                <IconMoon stroke={1} size={30} />
              ) : (
                <IconSun stroke={1} size={30} />
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
