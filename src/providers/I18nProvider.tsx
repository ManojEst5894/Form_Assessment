'use client';

import { I18nextProvider } from 'react-i18next';
import { useEffect, useState } from 'react';
import i18n from '@/i18n';

import { ReactNode } from 'react';

export default function I18nProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('language') || 'en';
        i18n.changeLanguage(savedLang);
        setMounted(true);
    }, []);

    if (!mounted) return null; // Prevents SSR issues

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
