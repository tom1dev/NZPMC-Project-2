
import style from "../../styles/competitionAnswering.module.css"
import { useEffect,useState } from "react";


const CompetitionFillout = (competition) =>{
    const[questions,setQuestions] = useState();
    const[started,setStarted] = useState(false);

    useEffect(() =>{
        const fetchQuestionsForCompetition = async () => {
            try {
                const gottenQuestions = await competitionService.getQuestionsForCompetition(competition.title);
                setQuestions(gottenQuestions);
            } catch (error) {
                console.log('Error fetching event user amount:', error);
            }
        };

        fetchQuestionsForCompetition
    },[])

    const toggleStart = () => {
        setStarted(!started)
    }

    return(
        <>
            {
                started?
                <h1>h</h1>:
                <button className={style.startButton} onClick={(e) => {toggleStart()} }>Start</button>
                
                
                
            }
        
        
        
        </>
    );
}
export default CompetitionFillout;