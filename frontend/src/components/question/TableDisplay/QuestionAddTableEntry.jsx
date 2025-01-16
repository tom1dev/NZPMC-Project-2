import styles from '../../../styles/Questions.module.css'
import QuestionTableEntry from './QuestionTableEntry.jsx';
import competitionService from '../../../services/competitionService.js';

//displays the question in a table format with an add question button whichs adds the question to the competition
const QuestionAddTableEntry = ({ question, competitionTitle }) => {

    const handleAddQuestion = async () => {
        await competitionService.addQuestionToCompetition(competitionTitle, question);
        window.location.reload();
    }

    return (
        <div className={styles.addQuestionContainer}>
            <QuestionTableEntry question={question} />
            <button className={styles.addQuestionButton} onClick={() => { handleAddQuestion() }} >Add Question</button>

        </div>
    );
}

export default QuestionAddTableEntry;