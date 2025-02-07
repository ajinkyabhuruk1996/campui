import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoggedInUserContext } from './UserContext';

// A simple test component that consumes the LoggedInUserContext
const TestComponent = () => {
  const contextValue = useContext(LoggedInUserContext);
  return <div data-testid="context-value">{JSON.stringify(contextValue)}</div>;
};

describe('LoggedInUserContext', () => {
  test('provides default empty object value', () => {
    const { getByTestId } = render(
      <LoggedInUserContext.Provider value={{}}>
        <TestComponent />
      </LoggedInUserContext.Provider>
    );

    expect(getByTestId('context-value')).toHaveTextContent('{}');
  });

  test('provides a custom user context value', () => {
    const mockUser = { name: 'John Doe', role: 'admin' };

    const { getByTestId } = render(
      <LoggedInUserContext.Provider value={mockUser}>
        <TestComponent />
      </LoggedInUserContext.Provider>
    );

    expect(getByTestId('context-value')).toHaveTextContent(JSON.stringify(mockUser));
  });
});
