'use client';

import React from 'react';
import { Header, HeaderName, Dropdown, HeaderGlobalBar, HeaderGlobalAction } from "@carbon/react";
import { UserAvatar, Logout } from "@carbon/icons-react";
import { useTranslation } from 'react-i18next';

interface HeaderComponentProps {
    readonly language: string;
    readonly onLanguageChange: (selectedItem: { id: string; label: string; } | null) => void;
}

function HeaderComponent({ language, onLanguageChange }: HeaderComponentProps) {
    const { t } = useTranslation();

    const languageMap: { [key: string]: string } = {
        en: 'English',
        ja: '日本語',
        ko: '한국어',
    };

    const selectedLanguage = languageMap[language] || '';

    return (
        <Header className="custom-header">
            <HeaderName href="#" prefix="">
                {t('header.form')}
            </HeaderName>
            <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Profile">
                    <UserAvatar size={20} />
                </HeaderGlobalAction>
                <div className="dropdown-container">
                    <Dropdown
                        id="inline"
                        initialSelectedItem={{
                            text: selectedLanguage,
                        }}
                        itemToString={(item) => (item ? item.text : '')}
                        items={[
                            { text: 'English', id: 'en' },
                            { text: '日本語', id: 'ja' },
                            { text: '한국어', id: 'ko' }
                        ]}
                        label={selectedLanguage}
                        titleText={t('header.language')}
                        type="inline"
                        onChange={(event) => {
                            onLanguageChange({ id: event.selectedItem?.id ?? '', label: event.selectedItem?.text ?? '' });
                        }}
                    />
                </div>
                <HeaderGlobalAction aria-label="Logout">
                    <Logout size={20} />
                </HeaderGlobalAction>
            </HeaderGlobalBar>
        </Header>
    );
}

export default HeaderComponent;
