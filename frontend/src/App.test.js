import { render, screen } from '@testing-library/react';
import App from './App';

test('renders belajar react', () => {
  render(<App />);
  const linkElement = screen.getByText(/belajar react/i);
  expect(linkElement).toBeInTheDocument();
});