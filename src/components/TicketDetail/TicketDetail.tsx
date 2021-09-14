import React, { useState, useEffect } from 'react';
import { BackendService, Ticket } from 'backend';
import { useParams, useNavigate } from 'react-router-dom';

interface TicketDetailProps {
    backend: BackendService;
    returnTo: string;
}

const TicketDetail = ({ backend, returnTo }: TicketDetailProps) => {
    const { id } = useParams();
    const [ticket, setTicket] = useState<Ticket>();
    useEffect(() => {
        const ticketSub = backend.ticket(+id).subscribe(ticket => setTicket(ticket));
        return () => ticketSub.unsubscribe();
    });
    const navigate = useNavigate();
    if (!ticket) {
        return (
            <>
                <h2>Ticket Detail</h2>
                < p > Loading...</p >
            </>
        )
    }
    return (
        <>
            <h2>Ticket {`#${ticket.id}`} Detail</h2>
            <pre data-testid="TicketDetail">{JSON.stringify(ticket, null, 4)}</pre>
            <div>
                <button onClick={() => navigate(returnTo)}>Done</button>
            </div>
        </>
    );
};

export default TicketDetail;
