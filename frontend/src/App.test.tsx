import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const title = screen.getByText(/Kuberpoets/i);
  expect(title).toBeInTheDocument();
});

test('handles input', async () => {
  render(<App />);
  const field = screen.getByLabelText('Enter some text');
  expect(field).toBeInTheDocument();
  expect(screen.getByText('Enter some text below.')).toBeInTheDocument();

  fireEvent.change(field, { target: { value: 'a' } });

  fireEvent(
    screen.getByText('Analyze'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await screen.findByText('This poem feels...');
});
