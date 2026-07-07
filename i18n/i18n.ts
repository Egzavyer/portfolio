import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "../i18n/locales/en/translation.json";
import translationFr from "../i18n/locales/fr/translation.json";

const resources = {
  en: { translation: translationEn },
  fr: { translation: translationFr },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
