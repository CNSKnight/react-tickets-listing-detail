import { Observable, of, throwError } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assigneeId: null | number;
  completed: boolean;
  assignee?: string;
};

export type Tickets = Ticket[];

function randomDelay() {
  return Math.random() * 4000;
}

export class BackendService {
  storedTickets: Tickets = [
    {
      id: 0,
      description: 'Install a monitor arm',
      assigneeId: 111,
      completed: false,
    },
    {
      id: 1,
      description: 'Move the desk to the new location',
      assigneeId: 111,
      completed: false,
    },
    {
      id: 2,
      description: 'Code-up the exercise',
      assigneeId: 333,
      completed: false,
    },
  ];

  storedUsers: User[] = [
    { id: 111, name: 'Victor' },
    { id: 333, name: 'Steeve' },
    { id: 555, name: 'Randor' },
  ];

  lastId = 1;

  private findTicketById = (id: number) => {
    const found = this.storedTickets.find((ticket) => ticket.id === +id);
    if (found) return found;
    throw new Error(`Ticket (id=${id}) not found`);
  };
  private findUserById = (id: number) => this.storedUsers.find((user) => user.id === +id);

  tickets(): Observable<Tickets> {
    return of(this.storedTickets).pipe(
      map((tickets) => {
        return tickets.map((ticket) => {
          if (ticket.assigneeId) {
            const user = this.findUserById(ticket.assigneeId);
            user && (ticket.assignee = user.name);
          }
          return ticket;
        });
      }),
      delay(randomDelay())
    );
  }

  ticket(id: number): Observable<Ticket> {
    return of(this.findTicketById(id)).pipe(
      map((ticket) => {
        if (ticket.assigneeId) {
          const user = this.findUserById(ticket.assigneeId);
          user && (ticket.assignee = user.name);
        }
        return ticket;
      }),
      delay(randomDelay())
    );
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket(payload: { description: string }) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false,
    };

    return of(newTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => this.storedTickets.push(ticket))
    );
  }

  assign(ticketId: number, userId: number) {
    const foundTicket = this.findTicketById(+ticketId);
    const user = this.findUserById(+userId);

    if (foundTicket && user) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          ticket.assigneeId = +userId;
        })
      );
    }

    return throwError(new Error('ticket or user not found'));
  }

  complete(ticketId: number, completed: boolean) {
    const foundTicket = this.findTicketById(+ticketId);
    if (foundTicket) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          ticket.completed = true;
        })
      );
    }

    return throwError(new Error('ticket not found'));
  }
}
