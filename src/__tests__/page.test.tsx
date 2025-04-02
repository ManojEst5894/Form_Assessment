import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FormPage from '../app/dashboard/form/page';
import formReducer from '@/redux/formSlice';
import { useRouter } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const createMockStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        form: formReducer,
      },
      preloadedState: {
        form: {
          data: {
            dropdown1: '',
            dropdown2: '',
            textInput1: '',
            textInput2: '',
            textInputWithButton: '',
            isSubmitted: false,
            ...initialState, // Merge with test-provided initial state
          },
        },
      },
    });
  };
  

// Custom render function with providers
const renderWithProviders = (ui, { store = createMockStore() } = {}) => {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

describe('FormPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    renderWithProviders(<FormPage />);

    expect(screen.getByText('Form Title')).toBeInTheDocument();
    expect(screen.getByText('Dropdown 1')).toBeInTheDocument();
    expect(screen.getByText('Dropdown 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Text Input 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Text Input 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting an empty form', async () => {
    renderWithProviders(<FormPage />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Dropdown 1 is required')).toBeInTheDocument();
      expect(screen.getByText('Dropdown 2 is required')).toBeInTheDocument();
      expect(screen.getByText('Text Input 1 is required')).toBeInTheDocument();
      expect(screen.getByText('Text Input 2 is required')).toBeInTheDocument();
    });
  });

  it('successfully submits form with valid data', async () => {
    renderWithProviders(<FormPage />);

    fireEvent.click(screen.getByText('Dropdown 1'));
    fireEvent.click(screen.getByText('Option 1'));

    fireEvent.click(screen.getByText('Dropdown 2'));
    fireEvent.click(screen.getByText('Option 2'));

    fireEvent.change(screen.getByLabelText('Text Input 1'), { target: { value: 'Test Input 1' } });
    fireEvent.change(screen.getByLabelText('Text Input 2'), { target: { value: 'Test Input 2' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('disables form fields when data exists', () => {
    const store = createMockStore({
      dropdown1: 'Option 1',
      dropdown2: 'Option 2',
      textInput1: 'Existing input 1',
      textInput2: 'Existing input 2',
      isSubmitted: true,
    });

    renderWithProviders(<FormPage />, { store });

    expect(screen.getByLabelText('Text Input 1')).toBeDisabled();
    expect(screen.getByLabelText('Text Input 2')).toBeDisabled();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('navigates back to dashboard when clicking breadcrumb', () => {
    renderWithProviders(<FormPage />);

    fireEvent.click(screen.getByText('Dashboard'));

    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});
