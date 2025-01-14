import styles from '../../styles/Landing.module.css'
import styleCreateEvent from '../../styles/CreateEvent.module.css';
import { useEffect,useState } from 'react';
import competitionService from '../../services/competitionService';


const CreateQuestion = ({competition}) => {
    const [title,settitle] = useState('');
    const [answer1,setAnswer1] = useState('');
    const [answer2,setAnswer2] = useState('');
    const [answer3,setAnswer3] = useState('');
    const [answer4,setAnswer4] = useState('');
    const [correctAnswer,setCorrectAnswer] = useState(1);

    const [difficultyFilter, setDifficultyFilter] = useState('Easy');
    const [categoryFilter, setCategoryFilter] = useState('Geometry');

    
    const handleVariableChange = (event, setter) =>{
        setter(event.target.value)
    }


    //submits the created question to the database
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title || !answer1 || !answer2|| !answer3|| !answer4) {
            alert("Please fill out name,date and description.");
            return;
        }

        try{
            const question ={
                title:title,
                options:[answer1,
                answer2,
                answer3,
                answer4],
                difficulty:difficultyFilter,
                topic:categoryFilter,
                correctChoiceIndex:correctAnswer-1
            }

            await competitionService.addQuestionToCompetition(competition.title,question);
            alert("Question added");
            window.location.reload();
        }catch (error){
            console.log(error);
        }

    }

    return (
        <div className={styles.eventsContainer}>
            <h2 className={styles.eventTitle}>Create And Add Question</h2>
            
            <form   className={styleCreateEvent.createEventContainer} onSubmit={handleSubmit}>
                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Title</h2> 
                    <input className={styleCreateEvent.parrameterInput} value={title}  onChange={(event) =>handleVariableChange(event,settitle)}/>
                </div>


                            
                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Difficulty: </h2>
                                    
                    <select className={styleCreateEvent.parrameterInput} value={difficultyFilter} onChange={event => handleVariableChange(event,setDifficultyFilter)}>
                        <option value="Easy">{"Easy"}</option>
                        <option value="Medium">{"Medium"}</option>
                        <option value="Hard">{"Hard"}</option>
                    </select>
                </div>

                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Topic: </h2>
                    
                    <select className={styleCreateEvent.parrameterInput} value={categoryFilter} onChange={event => handleVariableChange(event,setCategoryFilter)}>
                        <option value="Geometry">{"Geometry"}</option>
                        <option value="Algebra">{"Algebra"}</option>
                        <option value="Waves">{"Waves"}</option>
                        <option value="Mechanics">{"Mechanics"}</option>
                    </select>
                </div>

                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Option 1:</h2> 
                    <input className={styleCreateEvent.parrameterInput} value={answer1}  onChange={(event) =>handleVariableChange(event,setAnswer1)}/>
                </div>
                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Option 2:</h2> 
                    <input className={styleCreateEvent.parrameterInput} value={answer2}  onChange={(event) =>handleVariableChange(event,setAnswer2)}/>
                </div>
                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Option 3:</h2> 
                    <input className={styleCreateEvent.parrameterInput} value={answer3}  onChange={(event) =>handleVariableChange(event,setAnswer3)}/>
                </div>
                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Option 4:</h2> 
                    <input className={styleCreateEvent.parrameterInput} value={answer4}  onChange={(event) =>handleVariableChange(event,setAnswer4)}/>
                </div>

                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Correct Answer index:</h2> 
                    <input className={styleCreateEvent.parrameterInput} value={correctAnswer}  onChange={(event) =>handleVariableChange(event,setCorrectAnswer)}/>
                </div>

                <button type="submit" className={styleCreateEvent.eventSubmitButton} >Create Question</button>
            </form>


        </div>
    )

}

export default CreateQuestion;