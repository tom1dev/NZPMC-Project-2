import styles from '../../../styles/Questions.module.css'
//displays the question in a table format
const QuestionTableEntry = ({ question }) => {
    return (
        <>
        
        <div className={styles.questionContainer}>
            <div className={styles.questionMainParramContainer}>
                <h2 className={styles.questionParram}>Title: {question.title}</h2>
                <h2 className={styles.questionParram}>Difficulty: {question.difficulty}</h2>
                <h2 className={styles.questionParram}>Topic: {question.topic}</h2>
            </div>

            <div className={styles.questionOptionsContainer}>

                <h2 className={styles.questionParram}>Option 1: {question.options[0]}</h2>
                <h2 className={styles.questionParram}>Option 2: {question.options[1]}</h2>
                <h2 className={styles.questionParram}>Option 3: {question.options[2]}</h2>
                <h2 className={styles.questionParram}>Option 4: {question.options[3]}</h2>
                <h2 className={styles.questionParram}>Correct Option: {question.correctChoiceIndex +1}</h2>


            </div>
        </div>
        
        
        
        
        </>

    );
}

export default QuestionTableEntry;