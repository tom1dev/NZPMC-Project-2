
import styles from '../../styles/Questions.module.css'

import QuestionTableEntry from './QuestionTableEntry.jsx';



const QuestionDisplay = ({questions}) => {


    return (<>
        <div className={styles.questionsContainer}>
            {questions && questions.length > 0 && questions.map((question) => {
                return <QuestionTableEntry  question={question}/>
            })}
        </div>

    </>)

}


export default QuestionDisplay;