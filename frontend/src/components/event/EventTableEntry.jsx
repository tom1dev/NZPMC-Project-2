import styles from '../../styles/Landing.module.css'
import {useState,useEffect} from 'react';
import userService from '../../services/userService.js';
import EventDetailsPopup from './EventDetailsPopup.jsx';
import { useNavigate } from 'react-router-dom';
import CompetitionEventLinkPopup from '../competition/CompetitionEventLinkPopup.jsx';


const EventTableEntry = ({event,user,enrolled}) => {
    const [enrolledUser,setEnrolledUser] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [isCompetitionPopup, setIsCompetitionPopup] =  useState(false);

    
    const navigate = useNavigate();


    useEffect(() => {
        setEnrolledUser(enrolled);
    },[enrolled]);


    const addUserToEvent = async (userId, eventId) => {
        try{
            const res = await userService.addUserToEvent(userId, eventId);
            return true;
        }catch (error){
            return false;
        }
    }

    //enrolls the user to the event
    const handleEnroll = (e) => {
        console.log("Enroll Clicked");
        if(user && user.name){
            const hasEnrolled = addUserToEvent(user.email,event.name);
            if(hasEnrolled){
                setEnrolledUser(true);
            }
        }
    }

    const togglePopup = () => {
        console.log("togglePopup Clicked");
        setPopupOpen(!popupOpen);
    }

    const toggleCompetitionPopup = () => {
        setIsCompetitionPopup(!isCompetitionPopup);
    }

    const handleSignUp = (e) => {
        navigate('/signin');
    }


    return (
        
        <div className={styles.eventTableListingBox}>
            <h2 className={styles.eventName}>{event.name}</h2>
            <h2 className={styles.eventDate}>{event.date}</h2>
            <button className={styles.eventViewButton} onClick={(e) => {togglePopup(e)}}>View</button>
            <button className={styles.eventViewButton} onClick={(e) => {toggleCompetitionPopup(e)}}>Add Competition</button>

            {/**If the user is not logged in, show the create account button */}
            {user && user.length === 0 && <button className={styles.eventSignInButton} onClick={(e) =>{handleSignUp(e)}}>Create Account</button>}

            {/**If the user is logged in and has not joined the event, show the join button */}
            {user && user.name && !enrolledUser && <button className={styles.eventViewButton} onClick={(e) =>{handleEnroll(e)}}>Join</button>}

            {/**If the user is logged in and has joined the event, show the joined div */}
            {user && enrolledUser && <div className={styles.enrolledDiv}>Joined</div>}

            {/** displays the popup for the current event**/}
            {popupOpen && <EventDetailsPopup togglePopup={togglePopup} event={event}/>}
            {!event.CompetitionTitle && isCompetitionPopup && <CompetitionEventLinkPopup togglePopup ={toggleCompetitionPopup} event={event}/>}
        </div>
    );



}

export default EventTableEntry;