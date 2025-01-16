import style from '../../../styles/UserPopup.module.css';
import {useState, useEffect} from 'react'
import attemptService from '../../../services/attemptService.js';
import UserResult from './UserResult.jsx';
import competitionService from '../../../services/competitionService.js';
import Dropdown from '../../misc/Dropdown.jsx';
import { use } from 'react';
import ResultsMetrics from './ResultsMetrics.jsx';

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
        const newQuestionScoreMap = new Map();
        const newUserScoreMap = new Map();
        // Create a lookup map for questions by their title
        const questionLookup = new Map(questions.map(question => [question.title, question]));

        attempts.forEach((attempt) => {
            let amountRight = 0;

        if (attempt.attempts && questions.length > 0) {
            Object.entries(attempt.attempts).forEach(([key, value]) => {
                const question = questionLookup.get(key);

                if (question && question.correctChoiceIndex + 1 == value) {
                    // Update the user's correct answer count
                    amountRight++;

                    // Update the question score map
                    if(newQuestionScoreMap.get(key)){
                        newQuestionScoreMap.set(key, newQuestionScoreMap.get(key) + 1);
                    }else{
                        newQuestionScoreMap.set(key, 1);
                    }
                }
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
                    <div className={style.MetricsContainer}>
                        <ResultsMetrics questions={questions} questionScoreMap={questionScoreMap} userScoreMap={userScoreMap}/>
                    </div>    
                    <div className={style.resultContainer}>


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

