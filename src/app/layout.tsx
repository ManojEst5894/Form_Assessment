'use client'
import './globals.scss';
import I18nProvider from "@/providers/I18nProvider";
import { Provider } from "react-redux";
import store from "@/redux/store";
import React, { useState, useEffect } from 'react';
import i18n from '@/i18n';
import HeaderComponent from './login/HeaderComponent';

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  const [language, setLanguage] = useState(i18n.language ?? 'en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') ?? 'en';
    setLanguage(savedLang);
    i18n.changeLanguage(savedLang);
  }, []);

  const handleLanguageChange = (selectedItem: { id: string; label: string } | null) => {
    if (selectedItem) {
      const newLang = selectedItem.id;
      setLanguage(newLang);
      i18n.changeLanguage(newLang);
      localStorage.setItem('language', newLang);
    }
  };

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <I18nProvider>
            <HeaderComponent language={language} onLanguageChange={handleLanguageChange} />
            <main>{children}</main>
          </I18nProvider>
        </Provider>
      </body>
    </html>
  );
}