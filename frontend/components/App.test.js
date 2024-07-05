import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import AppFunctional from './AppFunctional';

jest.mock('axios'); // Mock axios for testing purposes

describe('AppFunctional', () => {
  beforeEach(() => {
    render(<AppFunctional />);
  });

  test('renders initial state correctly', () => {
    expect(screen.getByText(/coordinates \(2, 2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/you moved 0 times/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type email/i)).toHaveValue('');
  });

  test('moving left from initial position shows error message', () => {
    fireEvent.click(screen.getByText('LEFT'));
    expect(screen.getByText(/you can't go left/i)).toBeInTheDocument();
  });

  test('moving up from initial position shows error message', () => {
    fireEvent.click(screen.getByText('UP'));
    expect(screen.getByText(/you can't go up/i)).toBeInTheDocument();
  });

  test('moving right from initial position works', () => {
    fireEvent.click(screen.getByText('RIGHT'));
    expect(screen.getByText(/coordinates \(3, 2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/you moved 1 time/i)).toBeInTheDocument();
  });

  test('moving down from initial position works', () => {
    fireEvent.click(screen.getByText('DOWN'));
    expect(screen.getByText(/coordinates \(2, 3\)/i)).toBeInTheDocument();
    expect(screen.getByText(/you moved 1 time/i)).toBeInTheDocument();
  });

  test('reset button works', () => {
    fireEvent.click(screen.getByText('RIGHT')); // Move once to change state
    fireEvent.click(screen.getByText('reset'));
    expect(screen.getByText(/coordinates \(2, 2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/you moved 0 times/i)).toBeInTheDocument();
  });

  test('form submission shows a success message', async () => {
    const mockedResponse = { data: { message: 'Success!' } };
    axios.post.mockResolvedValue(mockedResponse);

    fireEvent.change(screen.getByPlaceholderText(/type email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => screen.getByText(/success/i));

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:9000/api/result',
      { email: 'test@example.com', x: 2, y: 2, steps: 0 }
    );
  });
});