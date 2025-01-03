
import styles from '../../styles/Landing.module.css'
import { useEffect, useState } from 'react';

import userService from '../../services/userService.js';
import eventService from '../../services/eventService.js';
import CompetitionDetailsParramTitles from './CompetitionDetailsParramTitles.jsx';
import CompetitionTableEntry from './CompetitionTableEntry.jsx';
import competitionService from '../../services/competitionService.js';


const CompetitionDisplay = () => {
    const [competitions, setCompetitions] = useState([]);

    //fetches all the competitions.
    useEffect(() => {

        const fetchCompetition = async () => {
            await getAllCompetitions();
        }

        fetchCompetition();

    }, []);

    //fetches all the event ids that the user has joined in
    const getAllCompetitions = async () => {
        try {
            const competitions = await competitionService.getAllCompetitions();
            setCompetitions(competitions);

        } catch (error) {
            console.log(error);
        }
    }


    return (<>
        <div className={styles.eventsContainer}>

            <h2 className={styles.eventTitle}>Competitions</h2>

            <CompetitionDetailsParramTitles/>


            {
                //for every competition in the competitions array, display the competition as a table entry
                competitions && competitions.length > 0 && competitions.map((competition) => {
                return <CompetitionTableEntry  competition={competition}/>
            })}
        </div>

    </>)

}


export default CompetitionDisplay;