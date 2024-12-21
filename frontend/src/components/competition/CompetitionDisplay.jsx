
import styles from '../../styles/Landing.module.css'
import { useEffect, useState } from 'react';
import EventTableEntry from '../event/EventTableEntry.jsx'

import userService from '../../services/userService.js';
import eventService from '../../services/eventService.js';
import EventDetailsParramTitles from '../event/EventDetailsParramTitles.jsx';
import competitionService from '../../services/competitionService.js';


const CompetitionDisplay = () => {
    const [competitions, setcompetitions] = useState([]);

    //fetches all the events and the user's events
    useEffect(() => {

        const fetchEvents = async () => {
            await getAllCompetitions();
        }

        fetchEvents();

    }, []);

    //fetches all the event ids that the user has joined in
    const getAllCompetitions = async () => {
        try {
            const competitions = await competitionService.getAllCompetitions();
            setUserEventsIds(competitions);

        } catch (error) {
            console.log(error);
        }
    }


    return (<>
        <div className={styles.eventsContainer}>

            <h2 className={styles.eventTitle}>Competitions</h2>

            <EventDetailsParramTitles/>

            {competitions && competitions.length > 0 && events.map((event) => {
                return <EventTableEntry key={event.id} event={event} user={user} />
            })}
        </div>

    </>)

}


export default CompetitionDisplay;