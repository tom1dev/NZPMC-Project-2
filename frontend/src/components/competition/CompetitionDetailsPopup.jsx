
import style from '../../styles/UserPopup.module.css';
import {useState,useEffect} from 'react';
import Dropdown from '../misc/Dropdown.jsx';
import eventService from '../../services/eventService.js';
import QuestionDisplay from '../question/QuestionDisplay.jsx';
import competitionService from '../../services/competitionService.js';

const CompetitionDetailsPopup = ({setViewPopupOpen, competition}) => {
    const [questionAmount, setQuestionAmount] = useState(0);
    const [questions, setQuestions] = useState([]);

    //gets the amount of users that have joined the event apon loading
    useEffect(() => {
        const fetchEventUserAmount = async () => {
            try {
                const gottenQuestions = await competitionService.getQuestionsForCompetition(competition.title);
                setQuestions(gottenQuestions);


            } catch (error) {
                console.log('Error fetching event user amount:', error);
            }
        };

        fetchEventUserAmount();
        if(competition.questionIds){
            setQuestionAmount(competition.questionIds.length);
        }else{
            setQuestionAmount(0);
        }
    },[]);


    return (
        <div className={style.popupWindow}>
            <div className={style.popupContainer}>
                
                    <h className={style.popupTitle}>Competition Details</h>
                    
                    <h2 className={style.popupParram}>Name : {competition.title}</h2>
                    <h2 className={style.popupParram}>Number Of Questions: {questionAmount}</h2>
                    <h2 className={style.popupParram}>Number of Events for Competition:</h2>
                    <div className={style.dropdownContainer}>
                        <Dropdown DropdownTitle="Events">
                            hi
                        </Dropdown>
                        <Dropdown DropdownTitle="Questions">
                            <QuestionDisplay competition={competition}/>
                        </Dropdown>    
                    </div>             

                    <button className={style.popupCloseButton} onClick={(e) => setViewPopupOpen(false)}>Close</button>
            </div>

        </div>

    );





}

export default CompetitionDetailsPopup;
