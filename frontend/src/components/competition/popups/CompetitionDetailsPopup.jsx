import style from '../../../styles/UserPopup.module.css';
import {useState,useEffect} from 'react';
import Dropdown from '../../misc/Dropdown.jsx';
import eventService from '../../../services/eventService.js';
import userService from '../../../services/userService.js';
import QuestionDisplay from '../../question/TableDisplay/QuestionDisplay.jsx';
import CompetitionFillout from '../UserInput/CompetitionFillout.jsx';
import competitionService from '../../../services/competitionService.js';
import EventDropDownList from '../../event/EventDropDownList.jsx';

const CompetitionDetailsPopup = ({setViewPopupOpen, competition,hasJoinedEvent}) => {
    const [questionAmount, setQuestionAmount] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState();

    //gets the user and the questions for the competition
    useEffect(() => {
        fetchCompetitionQuestions();
        getUserAccount();
        fetchEvents();

        if(competition.questionIds){
            setQuestionAmount(competition.questionIds.length);
        }else{
            setQuestionAmount(0);
        }
    },[]);

    const fetchEvents = async () => {
        try {
            const gottenEvents = await eventService.getEventByCompetition(competition.title);
            setEvents(gottenEvents);
        } catch (error) {
            console.log('Error fetching event user amount:', error);
        }
    }
    
    const fetchCompetitionQuestions = async () => {
        try {
            const gottenQuestions = await competitionService.getQuestionsForCompetition(competition.title);
            setQuestions(gottenQuestions);
        } catch (error) {
            console.log('Error fetching event user amount:', error);
        }
    };

    const getUserAccount =  async () =>{
        try {
            const currentUser = await userService.getUserByToken();
            console.log(currentUser)
            setUser(currentUser[0]);
        } catch (error) {
            console.log('Error fetching event user amount:', error);
        }
    }

    return (
        <div className={style.popupWindow}>
            <div className={style.popupContainer}>
                
                    <h className={style.popupTitle}>Competition</h>
                    <h2 className={style.popupParram}>Name : {competition.title}</h2>
                    
                    <Dropdown DropdownTitle="Competition Details">
                        <h2 className={style.popupParram}>Number Of Questions: {questionAmount}</h2>
                        <h2 className={style.popupParram}>Date:  {competition.date}</h2>
                        <h2 className={style.popupParram}>Start Time: {competition.startTime}</h2>
                        <h2 className={style.popupParram}>Duration: {competition.duration}</h2>\
                    </Dropdown>

                    

                    
                    {
                        //if the user is the admin show the dropdowns for the competition questions and events
                        user && user.email == "admin" &&
                        <div className={style.dropdownContainer}>
                            <Dropdown DropdownTitle="Events">
                                <EventDropDownList events={events}/>
                            </Dropdown>
                            <Dropdown DropdownTitle="Questions">
                                <QuestionDisplay questions={questions}/>
                            </Dropdown>    
                        </div>  
                    }   

                    {
                        //if the user is not the admin show the competition fillout otherwise show a notification to sign in
                    (user&& user.name && hasJoinedEvent && user.name !== "admin")?
                            ( <CompetitionFillout competition = {competition}/>):(<h2>Please sign in and join event in order to start the competition</h2>)
                    }

           

                    <button className={style.popupCloseButton} onClick={(e) => setViewPopupOpen(false)}>Close</button>
            </div>

        </div>

    );





}

export default CompetitionDetailsPopup;
