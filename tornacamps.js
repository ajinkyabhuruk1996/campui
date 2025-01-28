import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UsersActionsCell from './UsersActionsCell';
import RBACWrapper from './../../App/rbac/RBACWrapper';

jest.mock('./../../App/rbac/RBACWrapper', () => ({ children }) => <>{children}</>);
jest.mock('@dtex/Icons', () => ({
  TokenIcon: () => <span data-testid="token-icon">TokenIcon</span>,
}));

describe('UsersActionsCell Component', () => {
  const mockRow = {
    id: '123',
    isDeletable: true,
    isActive: true,
  };

  const mockOnDeleteUser = jest.fn();
  const mockHandleActivate = jest.fn();
  const mockOnApiTokenManage = jest.fn();

  const renderComponent = (props) =>
    render(
      <UsersActionsCell
        row={mockRow}
        onDeleteUser={mockOnDeleteUser}
        handleActivate={mockHandleActivate}
        onApiTokenManage={mockOnApiTokenManage}
        apiAuthenticationEnabled={props.apiAuthenticationEnabled}
      />,
      { wrapper: MemoryRouter }
    );

  it('renders correctly and shows edit button', () => {
    renderComponent({ apiAuthenticationEnabled: true });

    expect(screen.getByTestId('edit-user-button')).toBeInTheDocument();
    expect(screen.getByText('Edit this user')).toBeInTheDocument();
  });

  it('shows API Authentication Token button if `apiAuthenticationEnabled` is true', () => {
    renderComponent({ apiAuthenticationEnabled: true });

    const apiAuthButton = screen.getByTestId('api-auth-button');
    expect(apiAuthButton).toBeInTheDocument();

    // Simulate click on API token management button
    fireEvent.click(apiAuthButton);
    expect(mockOnApiTokenManage).toHaveBeenCalledWith(mockRow);
  });

  it('hides API Authentication Token button if `apiAuthenticationEnabled` is false', () => {
    renderComponent({ apiAuthenticationEnabled: false });

    expect(screen.queryByTestId('api-auth-button')).not.toBeInTheDocument();
  });

  it('shows deactivate button when user is active and deletable', () => {
    renderComponent({ apiAuthenticationEnabled: false });

    const deactivateButton = screen.getByTestId('deactivate-user-button');
    expect(deactivateButton).toBeInTheDocument();

    // Simulate click on deactivate button
    fireEvent.click(deactivateButton);
    expect(mockOnDeleteUser).toHaveBeenCalledWith(mockRow);
  });

  it('shows activate button when user is inactive and deletable', () => {
    const inactiveRow = { ...mockRow, isActive: false };
    render(
      <UsersActionsCell
        row={inactiveRow}
        onDeleteUser={mockOnDeleteUser}
        handleActivate={mockHandleActivate}
        onApiTokenManage={mockOnApiTokenManage}
        apiAuthenticationEnabled={false}
      />,
      { wrapper: MemoryRouter }
    );

    const activateButton = screen.getByRole('button', { name: /Activate this user/i });
    expect(activateButton).toBeInTheDocument();

    // Simulate click on activate button
    fireEvent.click(activateButton);
    expect(mockHandleActivate).toHaveBeenCalledWith(inactiveRow);
  });
});
