import React from 'react';
import { Ticket } from 'backend';
import { useNavigate } from 'react-router-dom';

const TicketListItem = ({ ticket: t }: { ticket: Ticket }) => {
  const navigate = useNavigate();
  return (<>
    <li data-testid="TicketListItem" onClick={() => navigate(`/ticket/${t.id}`)}>
      <div>{t.completed ? <s>{t.description}</s> : t.description}</div>
      <div>Assignee: {t.assignee}</div>
    </li>
  </>)
};

export default TicketListItem;
