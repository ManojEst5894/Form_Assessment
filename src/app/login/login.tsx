import React from 'react';
import { Grid, Column, TextInput, Button } from "@carbon/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        }),
        onSubmit: (values) => {
            console.log('Form Values:', values);
            router.push('/dashboard'); // Corrected navigation path
        },
    });

    return (
        <Grid>
            <Column sm={4} md={4} lg={4}>
                <form onSubmit={formik.handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <TextInput
                            id="username"
                            labelText="Username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            invalid={formik.touched.username && !!formik.errors.username}
                            invalidText={formik.errors.username}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <TextInput
                            id="password"
                            labelText="Password"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            invalid={formik.touched.password && !!formik.errors.password}
                            invalidText={formik.errors.password}
                        />
                    </div>
                    <Button type="submit">Login</Button>
                </form>
            </Column>
        </Grid>
    );
};

export default Login;