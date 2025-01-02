
import style from "../../styles/competitionAnswering.module.css"
import { useEffect,useState } from "react";
import AnswerInput from "./AnswerInput";
import competitionService from "../../services/competitionService";
import userService from "../../services/userService";
import attemptService from "../../services/attemptService";

const CompetitionFillout = ({competition}) =>{
    const[questions,setQuestions] = useState();
    const[started,setStarted] = useState(false);
    const[hasFinishedAttempt, setHasFinishedAttempt] = useState(false);


    let map = new Map([]);


    const handleAnswerChange = (questionName,optionChosen) =>{
        map.set(questionName,optionChosen)
        console.log(map)
    }

    const checkUserFinished = async () =>{
        try{
            const user = await userService.getUserByToken();
            if(!user){
                return
            }
            console.log(user[0])
            const userAttempt = await attemptService.getAttempt(user[0].email, competition.title);

            if(userAttempt){
                setHasFinishedAttempt(true)
            }

        }catch(error){
            console.log(error)
            return;
        }
    }

    useEffect(() =>{
        const fetchQuestionsForCompetition = async () => {
            try {
                const gottenQuestions = await competitionService.getQuestionsForCompetition(competition.title);
                setQuestions(gottenQuestions);

            } catch (error) {
                console.log('Error fetching event user amount:', error);
            }
        };

        fetchQuestionsForCompetition()
        checkUserFinished()
    },[])

    const toggleStart = () => {
        setStarted(!started)
    }

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

    return(
        <>
            {
                started?
                
                    <div className={style.answersContainer}>
                        <h1 className={style.title}>Competition Questions</h1>

                        {questions.map((question, index) => {
                        return (
                            <AnswerInput key={index} question={question} setAnswer = {handleAnswerChange} />
                        );})}


                        <button className={style.startButton} onClick={(e) => {handleSubmit()} }>Finish</button>
                
                    </div>



                :
                (hasFinishedAttempt ?<h1 className={style.title}>Competition has Been Completed</h1>
                 :<button className={style.startButton} onClick={(e) => {toggleStart()} }>Start Competition</button>)
                      
                
            }
        </>
    );
}
export default CompetitionFillout;