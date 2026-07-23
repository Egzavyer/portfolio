import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full border-t border-text/10 bg-primary-300/65 px-5 py-8 text-center backdrop-blur-sm sm:px-8">
      <p className="text-sm font-medium text-text/70 sm:text-base">
        {t("footer.made")}
      </p>
    </footer>
  );
}
