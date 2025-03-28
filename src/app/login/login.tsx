'use client';

import React, { useState, useEffect } from 'react';
import { Grid, Column, TextInput, PasswordInput, Button, Header, HeaderName, Dropdown, HeaderGlobalBar } from "@carbon/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n'; // Ensure correct import

const Login = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [language, setLanguage] = useState(i18n.language || 'en');

    useEffect(() => {
        const savedLang = localStorage.getItem('language') || 'en';
        setLanguage(savedLang);
        i18n.changeLanguage(savedLang);
    }, []);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required(`${t('username')} ${t('is_required')}`),
            password: Yup.string()
                .min(6, `${t('password')} ${t('must_be_at_least_6_characters')}`)
                .required(t('required')),
        }),
        onSubmit: (values) => {
            console.log('Form Values:', values);
            router.push('/dashboard');
        },
    });

    const handleLanguageChange = (selectedItem: { id: string; label: string; } | null) => {
        if (selectedItem) {
            const newLang = selectedItem.id;
            setLanguage(newLang);
            i18n.changeLanguage(newLang);
            localStorage.setItem('language', newLang);
        }
    };

    return (
        <Grid>
            <Column sm={4} md={8} lg={16}>
                <Header>
                    <HeaderName href="#" prefix="">
                        {t('form')}
                    </HeaderName>
                    <HeaderGlobalBar>
                        <Dropdown
                            id="language-dropdown"
                            label={t('language')}
                            titleText={t('language')}
                            items={[
                                { id: 'en', label: 'English' },
                                { id: 'ja', label: '日本語' }
                            ]}
                            selectedItem={{ id: language, label: language === 'en' ? 'English' : '日本語' }}
                            onChange={(event) => handleLanguageChange(event.selectedItem)}
                        />
                    </HeaderGlobalBar>
                </Header>
            </Column>
            <Column sm={4} md={4} lg={4} style={{ marginTop: '4rem' }}>
                <form onSubmit={formik.handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <TextInput
                            id="username"
                            labelText={t('username')}
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            invalid={formik.touched.username && !!formik.errors.username}
                            invalidText={formik.errors.username}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <PasswordInput
                            id="password"
                            labelText={t('password')}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            invalid={formik.touched.password && !!formik.errors.password}
                            invalidText={formik.errors.password}
                        />
                    </div>
                    <Button type="submit">{t('login')}</Button>
                </form>
            </Column>
        </Grid>
    );
};

export default Login;
