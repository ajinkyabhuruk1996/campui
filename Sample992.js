import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import UserList from './UserList'; // Adjust import path
import { GET_USERS } from '../graphql/queries'; // Adjust if needed

describe('UserList Component', () => {
  test('renders loading state', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UserList />
      </MockedProvider>
    );

    // Check if loading text is displayed
    expect(screen.getByTestId('loading-user-list')).toHaveTextContent('Loading...');
  });

  test('renders error state', async () => {
    const errorMock = [
      {
        request: {
          query: GET_USERS,
          variables: {
            ordering: 'updatedAt',
            limit: 10,
            offset: 0,
          },
        },
        error: new Error('GraphQL error'),
      },
    ];

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <UserList />
      </MockedProvider>
    );

    // Wait for error state to appear
    await screen.findByTestId('user-list-error');
    
    // Check if error message is displayed
    expect(screen.getByTestId('user-list-error')).toHaveTextContent(
      'Unexpected error. Contact DTEX support with this message.'
    );
  });
});
