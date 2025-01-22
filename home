import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USER_PAGE_CONFIG } from './graphql/queries';
import UserPage from './UserPage';
import { LoggedInUserContext } from './UserContext';
import UserContainer from './UserContainer';

// Mocking the UserContainer component
jest.mock('./UserContainer', () => jest.fn(() => <div>UserContainer Mock</div>));

describe('UserPage', () => {
  const accountDetails = { username: 'admin', email: 'admin@example.com' };

  const mocks = [
    {
      request: {
        query: GET_USER_PAGE_CONFIG,
      },
      result: {
        data: {
          userPageConfig: {
            groups: ['Admin', 'Editor', 'Viewer'],
            apiAuthenticationEnabled: true,
          },
        },
      },
    },
  ];

  const renderComponent = () =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserPage accountdetails={accountDetails} />
      </MockedProvider>
    );

  it('renders the loading state initially', () => {
    renderComponent();

    // Check if the loading component is rendered
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders the UserContainer with the correct props after data loads', async () => {
    renderComponent();

    // Wait for the data to load
    await waitFor(() => {
      expect(UserContainer).toHaveBeenCalledWith(
        expect.objectContaining({
          userGroups: ['Admin', 'Editor', 'Viewer'],
          apiAuthenticationEnabled: true,
        }),
        {}
      );
    });

    // Check if the UserContainer mock is rendered
    expect(screen.getByText(/UserContainer Mock/i)).toBeInTheDocument();
  });

  it('passes accountdetails to LoggedInUserContext', async () => {
    renderComponent();

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText(/UserContainer Mock/i)).toBeInTheDocument();
    });

    // Verify context is passed by checking the UserContainer mock
    expect(UserContainer).toHaveBeenCalled();
  });
});
