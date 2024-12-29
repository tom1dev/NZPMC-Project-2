import style from '../../styles/UserPopup.module.css';
import {useState,useEffect} from 'react';
import Dropdown from '../misc/Dropdown.jsx';
import eventService from '../../services/eventService.js';
import QuestionDisplay from '../question/QuestionDisplay.jsx';
import competitionService from '../../services/competitionService.js';

const CompetitionEventLinkPopup = ({togglePopup, event}) => {
    const[competitionTitle, setCompetitionTitle] = useState("");

    //gets the amount of users that have joined the event apon loading
    useEffect(() => {

    },[]);

    const handleCompetitionLink = async () =>{
        try{
            console.log(competitionTitle)
            const competition = await competitionService.getCompetitionByTitle(competitionTitle);
            if(!competition){
                alert("Competition cannot be found")
                return;
            }

            await competitionService.addEventToCompetition(competitionTitle, event.name);
        }catch(error){
            alert("Competition cannot be found")
            console.log(error)
        }  
    }


    return (
        <div className={style.popupWindow}>
            <div className={style.popupContainer}>
                
                    <h className={style.popupTitle}>Add Competition</h>
                    
                    <h2 className={style.popupParram}>Event Name: {event.name}</h2>
                    
                    <h2 className={style.popupParram}>Competition Title:</h2>
                    <input value={competitionTitle} onChange={e => setCompetitionTitle(e.target.value)}></input>
                    
                    
                             
                    <button className={style.popupCloseButton} onClick={(e) => (handleCompetitionLink())}>Add Competition to Event</button>
                    <button className={style.popupCloseButton} onClick={(e) => togglePopup()}>Close</button>
            </div>

        </div>

    );





}

export default CompetitionEventLinkPopup;
