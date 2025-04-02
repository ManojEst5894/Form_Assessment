'use client';

import React, {useEffect } from 'react';
import { Grid, Column, TextInput, Button, PasswordInput } from "@carbon/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n'; 


const Login = () => {
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        const savedLang = localStorage.getItem('language') ?? 'en';
        i18n.changeLanguage(savedLang);
    }, []);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required(`${t('loginForm.username')} ${t('loginForm.is_required')}`),
            password: Yup.string()
                .min(6, `${t('loginForm.password')} ${t('loginForm.must_be_at_least_6_characters')}`)
                .required(t('loginForm.required')),
        }),
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (values) => {
            console.log('Form Values:', values);
            router.push('/dashboard');
        },
    });

    return (
        <Grid className="login-container">
            <Column sm={4} md={4} lg={4} className="login-form">
                <h2 className="form-title">{t('loginForm.welcome')}</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-field">
                        <TextInput
                            id="username"
                            labelText={t('loginForm.username')}
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                                formik.handleBlur(e);
                                formik.validateField('username');
                            }}
                            invalid={formik.touched.username && !!formik.errors.username}
                            invalidText={formik.errors.username}
                        />
                    </div>
                    <div className="form-field">
                        <PasswordInput
                            id="password"
                            labelText={t('loginForm.password')}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                                formik.validateField('password');
                            }}
                           invalid={formik.touched.password && !!formik.errors.password}
                           invalidText={formik.errors.password}
                        />
                    </div>
                    <Button type="submit">{t('loginForm.login')}</Button>
                </form>
            </Column>
        </Grid>
    );
};

export default Login;
