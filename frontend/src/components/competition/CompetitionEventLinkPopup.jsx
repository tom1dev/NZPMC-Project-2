import style from '../../styles/UserPopup.module.css';
import {useState,useEffect} from 'react';
import competitionService from '../../services/competitionService.js';
import CompetitionEventLinkTableElement from './CompetitionEventLinkTableElement.jsx';

const CompetitionEventLinkPopup = ({togglePopup, event}) => {
    const[competitions, setCompetitions] = useState([]);

    useEffect(() => {

        getAllCompetitions()



    },[]);

    const getAllCompetitions = async () => {
        try {
            const competitions = await competitionService.getAllCompetitions();
            setCompetitions(competitions);

        } catch (error) {
            console.log(error);
        }


    }


    //links the competition to the current event
    const handleCompetitionLink = async (competitionTitle) =>{
        try{
            const competition = await competitionService.getCompetitionByTitle(competitionTitle);
            if(!competition){
                alert("Competition cannot be found")
                return;
            }
    
            await competitionService.addEventToCompetition(competitionTitle, event.name);
            alert("Competition has been added to the event")
            togglePopup();
            window.location.reload();
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
                    
                    <h2 className={style.popupParram}>Competitions:</h2>

                    {competitions.length > 0 && competitions.map((competition) => { return <CompetitionEventLinkTableElement key={competition.title} competition={competition} handleCompetitionLink={handleCompetitionLink}/> })}
                    
                             
                    <button className={style.popupCloseButton} onClick={(e) => togglePopup()}>Close</button>
            </div>

        </div>

    );





}

export default CompetitionEventLinkPopup;
