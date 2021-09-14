import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TicketList from './TicketList';

describe('<TicketList />', () => {
  test('it should mount', () => {
    render(<TicketList />);
    
    const ticketList = screen.getByTestId('TicketList');

    expect(ticketList).toBeInTheDocument();
  });
});