import React, { useEffect, useState } from 'react';
import './app.css';
import { BackendService, Tickets } from 'backend';
import TicketList from 'components/TicketList/TicketList';
import TicketDetail from 'components/TicketDetail/TicketDetail';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

interface AppProps {
  backend: BackendService;
}

const App = ({ backend }: AppProps) => {
  const [tickets, setTickets] = useState<Tickets | []>([]);

  // The backend returns observables, but you can convert to promises if
  // that is easier to work with. It's up to you.
  useEffect(() => {
    let lastFetched: Promise<any>;
    const fetchData = () => {
      const activeFetched = backend.tickets().toPromise();
      lastFetched = activeFetched;
      activeFetched
        .then((tickets) => {
          if (lastFetched !== activeFetched) return Promise.reject();
          setTickets(tickets || []);
        })
        .catch(() => { });
    };
    fetchData();

    // Example of use observables directly
    // const sub = backend.tickets().subscribe(result => {
    //   setTickets(result);
    // });
    // return () => sub.unsubscribe(); // clean up subscription
  }, [backend]);

  return (
    <Router>
      <div className="app">
        <Routes basename="">
          <Route path="" element={<Navigate to="/tickets" />} />
          <Route path="/tickets" element={<TicketList tickets={tickets} />} />
          <Route path="/ticket/:id" element={<TicketDetail backend={backend} returnTo={"/tickets"} />} />
        </Routes>
      </div>
    </Router>
  );
};
        ;


export default App;
