import { render, screen } from '@testing-library/react';
import App from './App';

// PUBLIC_INTERFACE
test('renders header brand', () => {
  render(<App />);
  const brand = screen.getByLabelText(/Recipe Explorer Home/i);
  expect(brand).toBeInTheDocument();
});
