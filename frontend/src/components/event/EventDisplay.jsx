
import styles from '../../styles/Landing.module.css'
import { useEffect, useState } from 'react';
import EventTableEntry from './EventTableEntry.jsx'

import userService from '../../services/userService.js';
import eventService from '../../services/eventService.js';
import EventDetailsParramTitles from './EventDetailsParramTitles.jsx';


const EventDisplay = ({ user }) => {
    const [events, setEvents] = useState([]);
    const [userEventIds, setUserEventsIds] = useState([]);

    //fetches all the events and the user's events
    useEffect(() => {

        const fetchEvents = async () => {
            await getAllEvents();
            if (user && user.email) {
                await fetchUserEvents(user.email);
            }
        }

        fetchEvents();

    }, [user]);

    //fetches all the event ids that the user has joined in
    const fetchUserEvents = async (userid) => {
        try {
            const userEvents = await userService.getEventsByUserId(userid);
           
            setUserEventsIds(userEvents);


        } catch (error) {
            console.log(error);
        }
    }

    //fetches all the events
    const getAllEvents = async () => {
        try {
            const events = await eventService.getAllEvents();
            setEvents(events);
        } catch (error) {
            console.log(error);
        }
    }

    //checks if the event is in the user's events
    const isUserEvent = (event) => {

        console.log(userEventIds);
        console.log(event.name);
        
        if(userEventIds.includes(event.name)){
            return true;
        }
       

        return false;
    }

    return (<>
        <div className={styles.eventsContainer}>

            <h2 className={styles.eventTitle}>Events</h2>

            <EventDetailsParramTitles/>

            {events && events.length > 0 && events.map((event) => {
                return <EventTableEntry key={event.id} event={event} user={user} enrolled={isUserEvent(event)} />
            })}
        </div>

    </>)

}


export default EventDisplay;