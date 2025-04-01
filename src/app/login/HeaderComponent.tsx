'use client';

import React from 'react';
import { Header, HeaderName, Dropdown, HeaderGlobalBar, HeaderGlobalAction } from "@carbon/react";
import { UserAvatar, Logout } from "@carbon/icons-react";
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
// import './HeaderComponent.scss';

interface HeaderComponentProps {
    language: string;
    onLanguageChange: (selectedItem: { id: string; label: string; } | null) => void;
}

function HeaderComponent({ language, onLanguageChange }: HeaderComponentProps) {
    const { t } = useTranslation();

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
                            text: language === 'en' ? 'English' : language === 'ja' ? '日本語' : language === 'ko' ? '한국어' : ''
                        }}
                        itemToString={(item) => (item ? item.text : '')}
                        items={[
                            { text: 'English', id: 'en' },
                            { text: '日本語', id: 'ja' },
                            { text: '한국어', id: 'ko' }
                        ]}
                        label={language === 'en' ? 'English' : language === 'ja' ? '日本語' : language === 'ko' ? '한국어' : ''}
                        titleText={t('header.language')}
                        type="inline"
                        onChange={(event) => onLanguageChange({ id: event.selectedItem.id, label: event.selectedItem.text })}
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
