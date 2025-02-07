import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import FormActions from './FormActions';

describe('FormActions Component', () => {
  const mockOnUserFormSubmit = jest.fn();
  const mockNavigate = jest.fn();

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  const defaultProps = {
    onUserFormSubmit: mockOnUserFormSubmit,
    userForm: { name: 'Test User' },
    userdata: { id: 1 },
    showSuccess: false,
    successMessage: '',
    errorMessage: '',
  };

  test('renders Save and Cancel buttons', () => {
    render(
      <MemoryRouter>
        <FormActions {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls onUserFormSubmit when Save button is clicked', () => {
    render(
      <MemoryRouter>
        <FormActions {...defaultProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Save'));
    expect(mockOnUserFormSubmit).toHaveBeenCalledWith(defaultProps.userForm, defaultProps.userdata);
  });

  test('navigates to /dashboard when Cancel button is clicked', () => {
    render(
      <MemoryRouter>
        <FormActions {...defaultProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('displays success message when showSuccess is true', () => {
    const successProps = { ...defaultProps, showSuccess: true, successMessage: 'User saved successfully!' };

    render(
      <MemoryRouter>
        <FormActions {...successProps} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('success-message')).toHaveTextContent('User saved successfully!');
  });

  test('displays error message when errorMessage is provided', () => {
    const errorProps = { ...defaultProps, errorMessage: 'Error saving user' };

    render(
      <MemoryRouter>
        <FormActions {...errorProps} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('error-message')).toHaveTextContent('Error saving user');
  });
});
