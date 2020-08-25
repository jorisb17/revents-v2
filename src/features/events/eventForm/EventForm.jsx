import React, { useState } from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import cuid from 'cuid';

export default function EventForm({setFormOpen, setEvents, createEvent, selectedEvent, updateEvent}) {
    const intialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: ''
    }

    const [values, setValues] = useState(intialValues);

    function handleFormSubmit() {
        selectedEvent ? updateEvent({...selectedEvent, ...values}) : createEvent({...values, id: cuid(), hostedBy: 'Bob', attendees: [], hostPhotoURL: '/assets/user.png'});
        setFormOpen(false);
    }

    function handelInutChange(e) {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    return (
        <Segment clearing>
            <Header content={selectedEvent ? 'Edit the event' : 'create new event'}/>
            <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                    <input type='text' placeholder='Event Title' name='title' value={values.title} onChange={e => handelInutChange(e)}/>
                </Form.Field>
                <Form.Field>
                    <input type='text' placeholder='Category' name='category' value={values.category} onChange={e => handelInutChange(e)}/>
                </Form.Field>
                <Form.Field>
                    <input type='text' placeholder='Description' name='description' value={values.description} onChange={e => handelInutChange(e)}/>
                </Form.Field>
                <Form.Field>
                    <input type='text' placeholder='City' name='city' value={values.city} onChange={e => handelInutChange(e)}/>
                </Form.Field>
                <Form.Field>
                    <input type='text' placeholder='Venue' name='venue' value={values.venue} onChange={e => handelInutChange(e)}/>
                </Form.Field>
                <Form.Field>
                    <input type='date' placeholder='Date' name='date' value={values.date} onChange={e => handelInutChange(e)}/>
                </Form.Field>
                <Button type='submit' floated='right' positive content='Submit'/>
                <Button onClick={() => setFormOpen()} floated='right' content='Cancel'/>
            </Form>
        </Segment>
    )
}