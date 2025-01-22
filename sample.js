import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import UserContainer from './UserContainer';
import { CREATE_USER, UPDATE_USER } from './graphql/mutations';
import { LoggedInUserContext } from './UserContext';

const mocks = [
  {
    request: {
      query: CREATE_USER,
      variables: {
        input: {
          // mock user creation input
          username: 'newuser',
          email: 'newuser@example.com',
        },
      },
    },
    result: {
      data: {
        createUser: {
          success: true,
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_USER,
      variables: {
        input: {
          id: '1',
          username: 'updateduser',
          email: 'updateduser@example.com',
        },
      },
    },
    result: {
      data: {
        updateUser: {
          success: true,
        },
      },
    },
  },
];

describe('UserContainer', () => {
  const loggedInUser = { username: 'admin' };

  const renderComponent = () =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoggedInUserContext.Provider value={loggedInUser}>
          <UserContainer
            sortBy="username"
            sortOrder="asc"
            sortHandler={jest.fn()}
            filtersBarOpen={true}
            toogleFiltersBar={jest.fn()}
            setSortState={jest.fn()}
            setFilterStates={jest.fn()}
            classes={{}}
            userGroups={[]}
            apiAuthenticationEnabled={true}
          />
        </LoggedInUserContext.Provider>
      </MockedProvider>
    );

  it('renders the component correctly', async () => {
    renderComponent();

    // Check if "Add User" button is rendered
    expect(screen.getByText('Add User')).toBeInTheDocument();

    // Check if filters bar is rendered
    expect(screen.getByText('Show Filters')).toBeInTheDocument();

    // Check if the ManageUsersTable component is rendered
    expect(await screen.findByText(/ManageUsersTable/i)).toBeInTheDocument();
  });

  it('opens the UserDialog when "Add User" is clicked', async () => {
    renderComponent();

    const addUserButton = screen.getByText('Add User');
    fireEvent.click(addUserButton);

    // Check if the UserDialog is displayed
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('triggers the create user mutation on form submission', async () => {
    renderComponent();

    const addUserButton = screen.getByText('Add User');
    fireEvent.click(addUserButton);

    // Simulate form submission
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Wait for the mutation to complete and Snackbar to show
    await waitFor(() => {
      expect(screen.getByText('User created successfully!')).toBeInTheDocument();
    });
  });

  it('handles errors during user creation', async () => {
    const errorMocks = [
      {
        request: {
          query: CREATE_USER,
          variables: {
            input: {
              username: 'erroruser',
              email: 'error@example.com',
            },
          },
        },
        error: new Error('Failed to create user'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <LoggedInUserContext.Provider value={loggedInUser}>
          <UserContainer
            sortBy="username"
            sortOrder="asc"
            sortHandler={jest.fn()}
            filtersBarOpen={true}
            toogleFiltersBar={jest.fn()}
            setSortState={jest.fn()}
            setFilterStates={jest.fn()}
            classes={{}}
            userGroups={[]}
            apiAuthenticationEnabled={true}
          />
        </LoggedInUserContext.Provider>
      </MockedProvider>
    );

    const addUserButton = screen.getByText('Add User');
    fireEvent.click(addUserButton);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Error encountered while saving user information.')
      ).toBeInTheDocument();
    });
  });

  it('closes the UserDialog when the close button is clicked', async () => {
    renderComponent();

    const addUserButton = screen.getByText('Add User');
    fireEvent.click(addUserButton);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    // Wait for the dialog to close
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

