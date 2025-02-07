import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetGroupsForm from './GetGroupsForm';

describe('GetGroupsForm Component', () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    groups: {
      label: 'User Roles:',
      value: [
        { id: 1, name: 'Admin', description: 'Administrator role', checked: false, disabled: false },
        { id: 2, name: 'Editor', description: 'Editor role', checked: true, disabled: false },
      ],
      onChange: mockOnChange,
      error: '',
    },
  };

  test('renders the group form with label', () => {
    render(<GetGroupsForm {...defaultProps} />);
    expect(screen.getByText('User Roles:')).toBeInTheDocument();
  });

  test('renders all role switches correctly', () => {
    render(<GetGroupsForm {...defaultProps} />);

    expect(screen.getByLabelText('usergroup-1')).toBeInTheDocument();
    expect(screen.getByLabelText('usergroup-2')).toBeInTheDocument();

    expect(screen.getByLabelText('usergroup-2')).toBeChecked();
    expect(screen.getByLabelText('usergroup-1')).not.toBeChecked();
  });

  test('calls onChange when switch is toggled', () => {
    render(<GetGroupsForm {...defaultProps} />);

    const adminSwitch = screen.getByLabelText('usergroup-1');
    fireEvent.click(adminSwitch);

    expect(mockOnChange).toHaveBeenCalledWith(1, true, defaultProps.groups.value);
  });

  test('displays error message when error is present', () => {
    const errorProps = { ...defaultProps, groups: { ...defaultProps.groups, error: 'Please select at least one role' } };

    render(<GetGroupsForm {...errorProps} />);
    expect(screen.getByText('Please select at least one role')).toBeInTheDocument();
  });

  test('disables switch if disabled property is true', () => {
    const disabledProps = {
      ...defaultProps,
      groups: {
        ...defaultProps.groups,
        value: [{ id: 3, name: 'Viewer', description: 'View-only role', checked: false, disabled: true }],
      },
    };

    render(<GetGroupsForm {...disabledProps} />);
    const viewerSwitch = screen.getByLabelText('usergroup-3');
    expect(viewerSwitch).toBeDisabled();
  });
});
