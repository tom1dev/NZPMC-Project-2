
import style from "../../styles/competitionAnswering.module.css"
import { useEffect,useState } from "react";
import AnswerInput from "./AnswerInput";
import competitionService from "../../services/competitionService";
import userService from "../../services/userService";
import attemptService from "../../services/attemptService";
import CountdownTimer from "../misc/CountdownTimer";

const CompetitionFillout = ({competition}) =>{
    const[questions,setQuestions] = useState();
    const[started,setStarted] = useState(false);
    const[hasFinishedAttempt, setHasFinishedAttempt] = useState(false);

    //map to store the answers for the questions
    let map = new Map([]);


    const handleAnswerChange = (questionName,optionChosen) =>{
        map.set(questionName,optionChosen)
    }

    //checks if the user has already finished the competition
    const checkUserFinished = async () =>{
        try{
            const user = await userService.getUserByToken();
            if(!user){
                return
            }
            const userAttempt = await attemptService.getAttempt(user[0].email, competition.title);

            if(userAttempt){
                setHasFinishedAttempt(true)
            }

        }catch(error){
            console.log(error)
            return;
        }
    }


    const fetchQuestionsForCompetition = async () => {
        try {
            const gottenQuestions = await competitionService.getQuestionsForCompetition(competition.title);
            setQuestions(gottenQuestions);

        } catch (error) {
            console.log('Error fetching event user amount:', error);
        }
    };

    useEffect(() =>{
        fetchQuestionsForCompetition()
        checkUserFinished()
    },[])

    const toggleStart = () => {
        setStarted(!started)
    }

    //submits the attempt of the competition to the database
    const handleSubmit = async () =>{
        try{
            const user =  await userService.getUserByToken();
            console.log(map)
            attemptService.addAttempt({
                studentEmail: user[0].email,
                competitionId: competition.title,
                attempts: Object.fromEntries(map)})

            window.location.reload();
        }catch (error) {
            console.log('Error:', error);
        }       
    }
    
    const handleTimeout = () =>{
        handleSubmit()
        alert("Time is up!")
        
    }


    const getDeadline = () =>{
        if( competition.date && competition.startTime && competition.duration){
            let dateSplit = competition.date.split("/");
            let startTimeSplit = competition.startTime.split(":");
            let durationSplit = competition.duration.split(":");

            const startHours = parseInt(startTimeSplit[0], 10);
            const startMinutes = parseInt(startTimeSplit[1], 10);
            const durationHours = parseInt(durationSplit[0], 10);
            const durationMinutes = parseInt(durationSplit[1], 10);
       

            const deadline = new Date(dateSplit[2],dateSplit[1]-1,dateSplit[0],startHours+durationHours,startMinutes+durationMinutes);
            return deadline;
        }else{
            return new Date().getTime();
        }
    }

    return(
        <>
            {   
                //if the user has started the competition show the questions
                started?
                    <>
                        

                        <div className={style.answersContainer}>

                            <div className= {style.answersHeaderContainer}>
                                <h1 className={style.title}>Competition Questions</h1>
                                <CountdownTimer FinishTime={getDeadline} handleTimeOut = {handleTimeout}/>
                            </div>

                            {questions && questions.map((question, index) => {
                            return (
                                <AnswerInput key={index} question={question} setAnswer = {handleAnswerChange} />
                            );})}


                            <button className={style.startButton} onClick={(e) => {handleSubmit()} }>Finish</button>
                    
                        </div>


                    </>
                :
                (   //if the user has not started the competition show the start button or if the user has already finished the competition show a message
                    hasFinishedAttempt ?<h1 className={style.title}>Competition has Been Completed</h1>
                    :<button className={style.startButton} onClick={(e) => {toggleStart()} }>Start Competition</button>)
                      
                
            }
        </>
    );
}
export default CompetitionFillout;