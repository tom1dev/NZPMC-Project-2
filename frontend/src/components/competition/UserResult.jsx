import {useState, useEffect} from 'react'
import styles from "../../styles/Questions.module.css"

const UserResult = ({attempt,questions}) => {
    const[score, setScore] = useState(0);

    useEffect(()=>{
        let amountRight = 0;
        if(attempt.attempts && questions && questions.length >0){
            Object.entries(attempt.attempts).forEach(([key, value]) => {
                questions.forEach((question) =>{
                    
                    console.log(key)

                    if(question.title === key && question.correctChoiceIndex+1 == value){

                        amountRight = amountRight+1;

                    }

                })
            });
        }

        setScore(amountRight);



    },[questions,attempt]);

    return(
        <div className={styles.resultContainer}>
            <h3 className={styles.questionParram}>Student Email: {attempt.studentEmail}</h3>
            <h3 className={styles.questionParram}>Result: {score} / {questions.length}</h3>
        </div>
    )

}

export default UserResult;

