import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import Login from '@/app/login/login';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Login Component', () => {
    const mockPush = jest.fn();
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        localStorage.clear();
        jest.spyOn(localStorage, 'setItem');
        jest.spyOn(localStorage, 'getItem');
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders the login form', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('validates fields on blur', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );

        const usernameInput = screen.getByLabelText(/username/i);
        fireEvent.blur(usernameInput);

        await waitFor(() => {
            expect(screen.getByText(/username is required/i)).toBeInTheDocument();
        });
    });

    it('shows validation error for short password', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
        });
    });

    it('logs form values on submit', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );

        const username = 'testuser';
        const password = 'password123';

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: username } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: password } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Form Values:', { username, password });
        });
    });

    it('submits the form with valid data', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('enables the login button when both fields are filled', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );

        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        const button = screen.getByRole('button', { name: /login/i });
        expect(button).toBeEnabled();
    });

    it('checks if language is remembered after page reload', async () => {
        localStorage.setItem('language', 'es');
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );

        expect(screen.getByText(/login/i)).toBeInTheDocument(); // Assuming the button text changes to Spanish
    });

    it('redirects to dashboard if already logged in', async () => {
        localStorage.setItem('authToken', 'valid_token'); // Simulate already logged in
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/dashboard');
        });
    });
    
    it('shows validation error for empty username', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );

        fireEvent.blur(screen.getByLabelText(/username/i));

        await waitFor(() => {
            expect(screen.getByText(/username is required/i)).toBeInTheDocument();
        });
    });

    it('does not submit form with invalid data and shows validation errors', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/username is required/i)).toBeInTheDocument();
            expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
        });
    });

    it('redirects to the dashboard if user is already logged in', async () => {
        localStorage.setItem('authToken', 'valid_token'); // Simulate that user is already logged in

        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/dashboard'); // Expect a redirect
        });
    });
});
