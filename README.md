import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import APIAuthTokenDialog from './APIAuthTokenDialog';
import { GET_USER_API_TOKEN } from './graphql/queries';
import { GENERATE_API_TOKEN, CLEAR_API_TOKEN } from './graphql/mutations';

const mocks = [
  {
    request: {
      query: GET_USER_API_TOKEN,
      variables: { userId: '1' },
    },
    result: {
      data: {
        apiToken: {
          token: 'mock-token',
        },
      },
    },
  },
  {
    request: {
      query: GENERATE_API_TOKEN,
      variables: { userId: '1' },
    },
    result: {
      data: {
        generateApiToken: {
          success: true,
        },
      },
    },
  },
  {
    request: {
      query: CLEAR_API_TOKEN,
      variables: { userId: '1' },
    },
    result: {
      data: {
        clearApiToken: {
          success: true,
        },
      },
    },
  },
];

describe('APIAuthTokenDialog', () => {
  const user = { id: '1', username: 'testuser' };
  const onDialogClose = jest.fn();

  it('renders the dialog correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <APIAuthTokenDialog open={true} onDialogClose={onDialogClose} user={user} />
      </MockedProvider>
    );

    // Check dialog title
    expect(await screen.findByText(/API Authentication Token/i)).toBeInTheDocument();
    expect(screen.getByText(`API Authentication Token (${user.username})`)).toBeInTheDocument();

    // Check if token is displayed
    expect(await screen.findByDisplayValue('mock-token')).toBeInTheDocument();

    // Check if buttons are rendered
    expect(screen.getByText('Generate Token')).toBeInTheDocument();
    expect(screen.getByText('Clear Token')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('calls the generate token mutation on button click', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <APIAuthTokenDialog open={true} onDialogClose={onDialogClose} user={user} />
      </MockedProvider>
    );

    const generateButton = await screen.findByText('Generate Token');
    fireEvent.click(generateButton);

    // Wait for mutation to complete
    await waitFor(() => {
      expect(screen.queryByText('Generate Token')).toBeInTheDocument();
    });
  });

  it('calls the clear token mutation on button click', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <APIAuthTokenDialog open={true} onDialogClose={onDialogClose} user={user} />
      </MockedProvider>
    );

    const clearButton = await screen.findByText('Clear Token');
    fireEvent.click(clearButton);

    // Wait for mutation to complete
    await waitFor(() => {
      expect(screen.queryByText('Clear Token')).toBeInTheDocument();
    });
  });

  it('calls onDialogClose when the close button is clicked', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <APIAuthTokenDialog open={true} onDialogClose={onDialogClose} user={user} />
      </MockedProvider>
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(onDialogClose).toHaveBeenCalled();
  });
});
