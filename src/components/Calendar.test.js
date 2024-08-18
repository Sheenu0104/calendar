import { render, screen, fireEvent } from '@testing-library/react';
import CalendarApp from './components/Calendar';
import '@testing-library/jest-dom/extend-expect';

test('renders Calendar and handles events', () => {
  render(<CalendarApp />);
  
  const addButton = screen.getByText(/Add Event/i);
  expect(addButton).toBeInTheDocument();
  
  fireEvent.click(addButton);
  expect(screen.getByText(/Add Event/i)).toBeInTheDocument();
});
