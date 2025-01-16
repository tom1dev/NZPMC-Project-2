import style from '../../styles/UserPopup.module.css';
import {useState, useEffect} from 'react'
import attemptService from '../../services/attemptService';
import UserResult from './UserResult';
import competitionService from '../../services/competitionService';
import Dropdown from '../misc/Dropdown';
import { use } from 'react';
import ResultsMetrics from './ResultsMetrics';

const GeneratedResults = ({togglePopup, competition}) => {
    const[attempts, setAttempts] = useState([]);
    const[questions, setQuestionsAtempts] = useState([]);

    const[questionScoreMap, setQuestionScoreMap] = useState(new Map([]));
    const[userScoreMap, setUserScoreMap] = useState(new Map([]));


    //gets the attempts and the questions for the competition
    useEffect(() => {


        getQuestionAnswers();
        getAttempts();
        

    },[]);

    //calculates the score for the user and the questions
    useEffect(() => {


        calculateScore();
    },[attempts,questions]);

    const calculateScore = () => {
        const newQuestionScoreMap = new Map(questionScoreMap);
        const newUserScoreMap = new Map(userScoreMap);



        attempts.forEach((attempt) => {
                let amountRight = 0;
                //if the attempt has attempts and questions are not empty then check if the user got the question right
                if(attempt.attempts && questions && questions.length >0){
                    Object.entries(attempt.attempts).forEach(([key, value]) => {
                        questions.forEach((question) =>{
                            
                            //if the question title matches and correct choice chosen update the score maps
                            if(question.title === key && question.correctChoiceIndex+1 == value){
                                amountRight = amountRight+1;
                                if (newQuestionScoreMap.get(question.title)){
                                    newQuestionScoreMap.set(question.title,newQuestionScoreMap.get(question.title)+1);
                                }else{
                                    newQuestionScoreMap.set(question.title,1);
                                }

                            }
        
                        })
                    });
                }
                
                newUserScoreMap.set(attempt.studentEmail,amountRight);
        });

        setQuestionScoreMap(newQuestionScoreMap);
        setUserScoreMap(newUserScoreMap);
    }


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



    return (
        <div className={style.popupWindow}>
            <div className={style.popupContainer}>  

                    <h2 className={style.popupParram}>Generated Results</h2>       
                    <div className={style.resultContainer}>
                        <ResultsMetrics questions={questions} questionScoreMap={questionScoreMap} userScoreMap={userScoreMap}/>



                        <Dropdown DropdownTitle="User Results ">
                            {(questions.length>0&& attempts.length>0)? attempts.map((attempt,index) => {
                                return <UserResult key={index}  attempt = {attempt} questions = {questions} amountRight={userScoreMap.get(attempt.studentEmail)}/>}):
                            
                                <h2 className={style.popupParram}>No Results</h2>}
                        </Dropdown>
                    </div>    
                      
                    <button className={style.popupCloseButton} onClick={(e) => togglePopup()}>Close</button>
            </div>

        </div>

    );

}

export default GeneratedResults

