import React, {useState} from 'react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';

function App() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div>
      <NavBar setFormOpen={setFormOpen}/>
      <Container className='main'>
        <EventDashboard setFormOpen={setFormOpen} formOpen={formOpen}/>
      </Container>
    </div>
  );
}

export default App;
