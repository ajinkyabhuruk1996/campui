import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TabPanel from './TabPanel'; // Adjust import path

describe('TabPanel Component', () => {
  test('renders the TabPanel component with children', () => {
    render(
      <TabPanel id="test-panel">
        <p>TabPanel Content</p>
      </TabPanel>
    );

    // Check if TabPanel renders with children
    expect(screen.getByText(/TabPanel Content/i)).toBeInTheDocument();
  });

  test('applies the correct id attribute', () => {
    render(<TabPanel id="test-panel" />);
    
    // Check if the component has the correct id
    const tabPanelElement = screen.getByTestId('test-panel');
    expect(tabPanelElement).toHaveAttribute('id', 'test-panel');
  });

  test('applies the correct elevation when raised is true', () => {
    render(<TabPanel raised={true} />);

    // Check if the elevation is set (Material-UI applies elevation as a class)
    const tabPanelElement = screen.getByRole('region'); // Default role for Paper component
    expect(tabPanelElement).toHaveClass('MuiPaper-elevation2');
  });

  test('applies square property correctly', () => {
    render(<TabPanel square={true} />);

    const tabPanelElement = screen.getByRole('region');
    expect(tabPanelElement).toHaveClass('MuiPaper-rounded'); // Material-UI class for square property
  });

  test('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    render(<TabPanel style={customStyle} />);

    const tabPanelElement = screen.getByRole('region');
    expect(tabPanelElement).toHaveStyle('background-color: red');
  });
});
