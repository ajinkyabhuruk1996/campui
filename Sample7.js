import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetPasswordField from './GetPasswordField';

describe('GetPasswordField Component', () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();

  const defaultProps = {
    password: {
      hidden: false,
      value: '',
      onChange: mockOnChange,
      onBlur: mockOnBlur,
      placeholder: 'Enter your password',
      helperText: '',
      error: false,
      disabled: false,
    },
  };

  test('renders the password field when not hidden', () => {
    render(<GetPasswordField {...defaultProps} />);

    const passwordField = screen.getByLabelText('Password:');
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveAttribute('type', 'password');
  });

  test('does not render anything when hidden is true', () => {
    const hiddenProps = { ...defaultProps, password: { ...defaultProps.password, hidden: true } };

    render(<GetPasswordField {...hiddenProps} />);

    expect(screen.queryByLabelText('Password:')).not.toBeInTheDocument();
  });

  test('calls onChange when password input changes', () => {
    render(<GetPasswordField {...defaultProps} />);

    const passwordField = screen.getByLabelText('Password:');
    fireEvent.change(passwordField, { target: { value: 'newpassword' } });

    expect(mockOnChange).toHaveBeenCalledWith('newpassword');
  });

  test('calls onBlur when password field loses focus', () => {
    render(<GetPasswordField {...defaultProps} />);

    const passwordField = screen.getByLabelText('Password:');
    fireEvent.blur(passwordField);

    expect(mockOnBlur).toHaveBeenCalled();
  });

  test('displays helper text when provided', () => {
    const helperProps = { ...defaultProps, password: { ...defaultProps.password, helperText: 'Must be at least 8 characters' } };

    render(<GetPasswordField {...helperProps} />);

    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  test('shows error state when error is true', () => {
    const errorProps = { ...defaultProps, password: { ...defaultProps.password, error: true, helperText: 'Invalid password' } };

    render(<GetPasswordField {...errorProps} />);

    const passwordField = screen.getByLabelText('Password:');
    expect(passwordField).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Invalid password')).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    const disabledProps = { ...defaultProps, password: { ...defaultProps.password, disabled: true } };

    render(<GetPasswordField {...disabledProps} />);

    const passwordField = screen.getByLabelText('Password:');
    expect(passwordField).toBeDisabled();
  });
});
