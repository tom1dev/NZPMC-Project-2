import { useState, useEffect } from 'react'
import styles from "../../../styles/Questions.module.css"

const UserResult = ({ attempt, questions, amountRight }) => {

    return (
        <div className={styles.resultContainer}>
            <h3 className={styles.questionParram}>Student Email: {attempt.studentEmail}</h3>
            <h3 className={styles.questionParram}>Result: {amountRight} / {questions.length}</h3>
        </div>
    )

}

export default UserResult;

