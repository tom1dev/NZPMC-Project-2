
import styles from '../../styles/Questions.module.css'

import QuestionTableEntry from './QuestionTableEntry.jsx';
import QuestionAddTableEntry from './QuestionAddTableEntry.jsx';



const QuestionDisplay = ({questions, competitionTitle}) => {


    //decides if the question is to be displayed in a table or a form
    const handleQuestionTableEntry = (question) => {
        if(!competitionTitle) {
            return (<QuestionTableEntry  question={question}/>);
        }
        return( <QuestionAddTableEntry  question={question} competitionTitle= {competitionTitle}/>);
      



    }



    return (<>
    {
        //for every question in the questions array create add it to the display table
    }
        <div className={styles.questionsContainer}>
            {(questions && questions.length > 0) ? 
                (questions.map((question) => {
                    return handleQuestionTableEntry(question)
                })):
                (<h2 className={styles.questionParram}>No questions available</h2>)
            
            }
        </div>

    </>)

}


export default QuestionDisplay;