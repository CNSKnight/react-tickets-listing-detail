import React from 'react';
import TicketListItem from 'components/TicketListItem/TicketListItem';
import { Tickets } from 'backend';

const TicketList = ({ tickets }: { tickets?: Tickets }) => {
  if (!tickets || !tickets.length) {
    return <p data-testid="TicketList">No tickets have arrived.</p>;
  }
  const list = tickets.map((t) => <TicketListItem key={t.id} ticket={t} />);
  return (
    <div data-testid="TicketList">
      <h2>Tickets</h2>
      <ul>{list}</ul>
    </div>
  );
};

export default TicketList;
