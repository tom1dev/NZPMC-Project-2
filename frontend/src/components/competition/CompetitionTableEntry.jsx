import styles from '../../styles/Landing.module.css'
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const CompetitionTableEntry = ({competition}) => {
    const [popupOpen, setPopupOpen] = useState(false);

    //enrolls the user to the event
    const togglePopup = () => {
        console.log("togglePopup Clicked");
        setPopupOpen(!popupOpen);
    }


    return (
        <div className={styles.eventTableListingBox}>
            <h2 className={styles.eventName}>{competition.title}</h2>
            <h2 className={styles.eventDate}>{competition.QuestionIds?competition.QuestionIds.size():0 }</h2>
            <button className={styles.eventViewButton} onClick={(e) => {togglePopup(e)}}>View</button>
        </div>
    );



}

export default CompetitionTableEntry;