import styles from '../../styles/Questions.module.css'
import QuestionTableEntry from './QuestionTableEntry';
import competitionService from '../../services/competitionService';
//displays the question in a table format
const QuestionAddTableEntry = ({ question,competitionTitle }) => {

    const handleAddQuestion =async  () => {
        await competitionService.addQuestionToCompetition(competitionTitle,question);
        window.location.reload();
    }


    return (
        
        <div className={styles.addQuestionContainer}>
            <QuestionTableEntry question = {question}/>
            <button className={styles.addQuestionButton} onClick={() => {handleAddQuestion()}} >Add Question</button>

        </div>    
            

    );
}

export default QuestionAddTableEntry;