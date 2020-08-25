import React, {useState} from 'react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleSelectEvent(event) {
    setSelectedEvent(event);
    setFormOpen(true);
  }

  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setFormOpen(false);
  }


  return (
    <div>
      <NavBar setFormOpen={setFormOpen}/>
      <Container className='main'>
        <EventDashboard setFormOpen={handleCreateFormOpen} formOpen={formOpen} selectEvent={handleSelectEvent} selectedEvent={selectedEvent}/>
      </Container>
    </div>
  );
}

export default App;
