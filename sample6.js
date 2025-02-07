import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetExpirePasswordField from './GetExpirePasswordField';

describe('GetExpirePasswordField Component', () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    expirePassword: {
      hidden: false,
      value: false,
      onChange: mockOnChange,
    },
  };

  test('renders the checkbox when not hidden', () => {
    render(<GetExpirePasswordField {...defaultProps} />);
    
    const checkbox = screen.getByLabelText('User must change password on next logon');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('does not render anything when hidden is true', () => {
    const hiddenProps = { ...defaultProps, expirePassword: { ...defaultProps.expirePassword, hidden: true } };
    
    render(<GetExpirePasswordField {...hiddenProps} />);
    
    expect(screen.queryByLabelText('User must change password on next logon')).not.toBeInTheDocument();
  });

  test('calls onChange when checkbox is clicked', () => {
    render(<GetExpirePasswordField {...defaultProps} />);
    
    const checkbox = screen.getByLabelText('User must change password on next logon');
    
    fireEvent.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  test('checkbox reflects correct value', () => {
    const checkedProps = { ...defaultProps, expirePassword: { ...defaultProps.expirePassword, value: true } };
    
    render(<GetExpirePasswordField {...checkedProps} />);
    
    const checkbox = screen.getByLabelText('User must change password on next logon');
    expect(checkbox).toBeChecked();
  });
});
