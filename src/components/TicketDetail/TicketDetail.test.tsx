import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TicketDetail from './TicketDetail';

describe('<TicketDetail />', () => {
  test('it should mount', () => {
    render(<TicketDetail />);
    
    const ticketDetail = screen.getByTestId('TicketDetail');

    expect(ticketDetail).toBeInTheDocument();
  });
});