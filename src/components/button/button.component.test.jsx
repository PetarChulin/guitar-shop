import React from 'react';
import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import Button, { BUTTON_TYPE_CLASSES } from './button.component';

// const root = createRoot();

describe('Button Component', () => {
  test('renders the button with correct class for neon type', () => {
    render(<Button buttonType="neon">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(BUTTON_TYPE_CLASSES.neon);
  });

  test('renders the button with correct class for google type', () => {
    render(<Button buttonType="google">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(BUTTON_TYPE_CLASSES.google);
  });

  test('renders the button with correct class for inverted type', () => {
    render(<Button buttonType="inverted">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(BUTTON_TYPE_CLASSES.inverted);
  });

  test('renders the button with correct class for edit type', () => {
    render(<Button buttonType="edit">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(BUTTON_TYPE_CLASSES.edit);
  });

  test('renders the button with correct class for remove type', () => {
    render(<Button buttonType="remove">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(BUTTON_TYPE_CLASSES.remove);
  });

  test('calls the onClick function when the button is clicked', () => {
    const onClickMock = jest.fn();
    render(<Button buttonType="neon" onClick={onClickMock}>Click me</Button>);
    const button = screen.getByText('Click me');
    userEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });
});
