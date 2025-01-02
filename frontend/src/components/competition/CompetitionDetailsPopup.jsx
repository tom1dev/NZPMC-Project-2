import style from '../../styles/UserPopup.module.css';
import {useState,useEffect} from 'react';
import Dropdown from '../misc/Dropdown.jsx';
import eventService from '../../services/eventService.js';
import userService from '../../services/userService.js';
import QuestionDisplay from '../question/QuestionDisplay.jsx';
import CompetitionFillout from './CompetitionFillout.jsx';
import competitionService from '../../services/competitionService.js';

const CompetitionDetailsPopup = ({setViewPopupOpen, competition}) => {
    const [questionAmount, setQuestionAmount] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [user, setUser] = useState();

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

        const getUserAccount =  async () =>{
            try {
                const currentUser = await userService.getUserByToken();
                console.log(currentUser)
                setUser(currentUser[0]);
            } catch (error) {
                console.log('Error fetching event user amount:', error);
            }
        }

        fetchEventUserAmount();
        getUserAccount();
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
                    
                    {user && user.email == "admin" &&
                        <div className={style.dropdownContainer}>
                            <Dropdown DropdownTitle="Events">
                                hi
                            </Dropdown>
                            <Dropdown DropdownTitle="Questions">
                                <QuestionDisplay questions={questions}/>
                            </Dropdown>    
                        </div>  
                    }   

                    {
                    (user&& user.name)?
                            (user.name !== "admin" && <CompetitionFillout competition = {competition}/>):<h2>Please Sign In and Join competition in order to start it</h2>
                    }

           

                    <button className={style.popupCloseButton} onClick={(e) => setViewPopupOpen(false)}>Close</button>
            </div>

        </div>

    );





}

export default CompetitionDetailsPopup;
