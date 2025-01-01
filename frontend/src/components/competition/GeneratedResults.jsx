import style from '../../styles/UserPopup.module.css';
import {useState, useEffect} from 'react'
import attemptService from '../../services/attemptService';
import UserResult from './UserResult';
import competitionService from '../../services/competitionService';

const GeneratedResults = ({togglePopup, competition}) => {
    const[attempts, setAttempts] = useState([]);
    const[questions, setQuestionsAtempts] = useState([]);

    //gets the amount of users that have joined the event apon loading
    useEffect(() => {
        const getAttempts = async () => {
            try {    
                const gottenAtempts = await attemptService.getAllCompetitionEvents(competition.title);
                
                setAttempts(gottenAtempts)
            }catch(error){
                console.log(error)
            }
        }

        const getQuestionAnswers = async () => {
            try {    
                const gottenQuestions = await competitionService.getQuestionsForCompetition(competition.title);
                setQuestionsAtempts(gottenQuestions);
                
            }catch(error){
                console.log(error)
            }
        }

        getQuestionAnswers();
        getAttempts();

    },[]);

    return (
        <div className={style.popupWindow}>
            <div className={style.popupContainer}>  

                    <h2 className={style.popupParram}>Generated Results</h2>       
                    <div className={style.resultContainer}>
                        {questions&& attempts && attempts.map((attempt,index) => {return <UserResult key={index}  attempt = {attempt} questions = {questions}/>})}



                        
                    </div>    
                      


                    <button className={style.popupCloseButton} onClick={(e) => togglePopup()}>Close</button>
            </div>

        </div>

    );

}

export default GeneratedResults

