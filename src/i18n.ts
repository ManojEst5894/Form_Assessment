import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from '@/locales/en.json';
import jaTranslation from "@/locales/ja.json";
import koTranslation from "@/locales/ko.json"; // Import Korean translations

// Language resources
const resources = {
  en: { translation: enTranslation },
  ja: { translation: jaTranslation },
  ko: { translation: koTranslation }, // Add Korean translations
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback if language is not available
    interpolation: { escapeValue: false },
  });

export default i18n;