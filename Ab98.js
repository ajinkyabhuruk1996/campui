import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Switch from './Switch'; // Adjust import based on your file structure

describe('Switch Component', () => {
  test('renders the Switch component with default props', () => {
    render(<Switch id="test-switch" name="testSwitch" />);
    
    // Check if the switch is rendered
    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeInTheDocument();

    // Check if the default properties are applied
    expect(switchElement).toHaveAttribute('id', 'test-switch');
    expect(switchElement).toHaveAttribute('name', 'testSwitch');
    expect(switchElement).not.toBeChecked();
    expect(switchElement).not.toBeDisabled();
  });

  test('renders checked switch', () => {
    render(<Switch checked={true} />);
    
    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeChecked();
  });

  test('disables the switch when disabled prop is true', () => {
    render(<Switch disabled={true} />);
    
    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeDisabled();
  });

  test('calls onChange when switch is clicked', () => {
    const handleChange = jest.fn();
    render(<Switch onChange={handleChange} />);
    
    const switchElement = screen.getByRole('checkbox');
    fireEvent.click(switchElement);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('applies color prop correctly', () => {
    render(<Switch color="primary" />);
    
    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toHaveClass('MuiSwitch-colorPrimary'); // MUI applies class based on color
  });
});
