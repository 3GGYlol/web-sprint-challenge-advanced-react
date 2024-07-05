// Write your tests here
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional';

test('sanity', () => {
  expect(true).toBe(true);
});

test('renders initial state correctly', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/coordinates \(2, 2\)/i)).toBeInTheDocument();
  expect(screen.getByText(/you moved 0 times/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/type email/i)).toHaveValue('');
});

test('moving left from initial position shows error message', () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText(/left/i));
  expect(screen.getByText(/you can't go left/i)).toBeInTheDocument();
});

test('moving up from initial position shows error message', () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText(/up/i));
  expect(screen.getByText(/you can't go up/i)).toBeInTheDocument();
});

test('moving right from initial position works', () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText(/right/i));
  expect(screen.getByText(/coordinates \(2, 3\)/i)).toBeInTheDocument();
  expect(screen.getByText(/you moved 1 time/i)).toBeInTheDocument();
});

test('moving down from initial position works', () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText(/down/i));
  expect(screen.getByText(/coordinates \(3, 2\)/i)).toBeInTheDocument();
  expect(screen.getByText(/you moved 1 time/i)).toBeInTheDocument();
});

test('reset button works', () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText(/right/i));
  fireEvent.click(screen.getByText(/reset/i));
  expect(screen.getByText(/coordinates \(2, 2\)/i)).toBeInTheDocument();
  expect(screen.getByText(/you moved 0 times/i)).toBeInTheDocument();
});

test('form submission shows a success message', async () => {
  render(<AppFunctional />);
  fireEvent.change(screen.getByPlaceholderText(/type email/i), { target: { value: 'test@example.com' } });
  fireEvent.click(screen.getByText(/submit/i));
  expect(await screen.findByText(/success/i)).toBeInTheDocument();
});