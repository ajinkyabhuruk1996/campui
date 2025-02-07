import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetConfirmPasswordField from './GetConfirmPasswordField';

describe('GetConfirmPasswordField Component', () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();

  const defaultProps = {
    confirmPassword: {
      hidden: false,
      value: '',
      onChange: mockOnChange,
      onBlur: mockOnBlur,
      placeholder: 'Confirm your password',
      helperText: '',
      error: false,
      disabled: false,
    },
  };

  test('renders the confirm password field when not hidden', () => {
    render(<GetConfirmPasswordField {...defaultProps} />);

    const confirmPasswordField = screen.getByLabelText('Password Confirmation:');
    expect(confirmPasswordField).toBeInTheDocument();
    expect(confirmPasswordField).toHaveAttribute('type', 'password');
  });

  test('does not render anything when hidden is true', () => {
    const hiddenProps = { ...defaultProps, confirmPassword: { ...defaultProps.confirmPassword, hidden: true } };

    render(<GetConfirmPasswordField {...hiddenProps} />);

    expect(screen.queryByLabelText('Password Confirmation:')).not.toBeInTheDocument();
  });

  test('calls onChange when confirm password input changes', () => {
    render(<GetConfirmPasswordField {...defaultProps} />);

    const confirmPasswordField = screen.getByLabelText('Password Confirmation:');
    fireEvent.change(confirmPasswordField, { target: { value: 'newpassword' } });

    expect(mockOnChange).toHaveBeenCalledWith('newpassword');
  });

  test('calls onBlur when confirm password field loses focus', () => {
    render(<GetConfirmPasswordField {...defaultProps} />);

    const confirmPasswordField = screen.getByLabelText('Password Confirmation:');
    fireEvent.blur(confirmPasswordField);

    expect(mockOnBlur).toHaveBeenCalled();
  });

  test('displays helper text when provided', () => {
    const helperProps = { ...defaultProps, confirmPassword: { ...defaultProps.confirmPassword, helperText: 'Must match the password' } };

    render(<GetConfirmPasswordField {...helperProps} />);

    expect(screen.getByText('Must match the password')).toBeInTheDocument();
  });

  test('shows error state when error is true', () => {
    const errorProps = { ...defaultProps, confirmPassword: { ...defaultProps.confirmPassword, error: true, helperText: 'Passwords do not match' } };

    render(<GetConfirmPasswordField {...errorProps} />);

    const confirmPasswordField = screen.getByLabelText('Password Confirmation:');
    expect(confirmPasswordField).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    const disabledProps = { ...defaultProps, confirmPassword: { ...defaultProps.confirmPassword, disabled: true } };

    render(<GetConfirmPasswordField {...disabledProps} />);

    const confirmPasswordField = screen.getByLabelText('Password Confirmation:');
    expect(confirmPasswordField).toBeDisabled();
  });
});
