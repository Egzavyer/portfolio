import { useTranslation } from "react-i18next";
import { Navbar } from "./Navbar";

export function Hero() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="text-7xl">{t("hero.welcome")}</div>
        <div className="text-4xl">{t("hero.subtitle")}</div>
      </div>
    </div>
  );
}
