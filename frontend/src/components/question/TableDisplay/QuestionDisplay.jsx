
import styles from '../../../styles/Questions.module.css'

import QuestionTableEntry from './QuestionTableEntry.jsx';
import QuestionAddTableEntry from './QuestionAddTableEntry.jsx';
import { useState, useEffect } from 'react';



const QuestionDisplay = ({ questions, competitionTitle }) => {

    const [viewableQuestions, setViewableQuestions] = useState(questions);
    const [difficultyFilter, setDifficultyFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');

    //if the category or difficulty filter changes update the viewable questions
    useEffect(() => {
        handleViewableQuestions();
    }, [difficultyFilter, categoryFilter]);

    const handleViewableQuestions = () => {
        let newViewableQuestions = questions;

        if (difficultyFilter !== 'All') {
            newViewableQuestions = newViewableQuestions.filter((question) => question.difficulty === difficultyFilter);
        }
        else if (categoryFilter !== 'All') {
            newViewableQuestions = newViewableQuestions.filter((question) => question.topic === categoryFilter);
        }

        setViewableQuestions(newViewableQuestions);
    }

    //decides if the question is to be displayed in a table or a form
    const handleQuestionTableEntry = (question) => {
        if (!competitionTitle) {
            return (<QuestionTableEntry question={question} />);
        }
        return (<QuestionAddTableEntry question={question} competitionTitle={competitionTitle} />);

    }

    const handleChange = (event, setter) => {
        setter(event.target.value)
    };

    return (<>
        {
            //Displays the filter options
        }
        <div className={styles.filterContainer}>
            <h3 className={styles.questionParram}>Difficulty: </h3>

            <select className={styles.filterInput} value={difficultyFilter} onChange={event => handleChange(event, setDifficultyFilter)}>
                <option value="All">{"All"}</option>
                <option value="Easy">{"Easy"}</option>
                <option value="Medium">{"Medium"}</option>
                <option value="Hard">{"Hard"}</option>
            </select>

            <h3 className={styles.questionParram}>Topic: </h3>

            <select className={styles.filterInput} value={categoryFilter} onChange={event => handleChange(event, setCategoryFilter)}>
                <option value="All">{"All"}</option>
                <option value="Geometry">{"Geometry"}</option>
                <option value="Algebra">{"Algebra"}</option>
                <option value="Waves">{"Waves"}</option>
                <option value="Mechanics">{"Mechanics"}</option>
            </select>

        </div>

        {
            //for every question in the questions array create add it to the display table
        }
        <div className={styles.questionsContainer}>
            {(viewableQuestions && viewableQuestions.length > 0) ?
                (viewableQuestions.map((question) => {
                    return handleQuestionTableEntry(question)
                })) :
                (<h2 className={styles.questionParram}>No questions available</h2>)

            }
        </div>

    </>)

}


export default QuestionDisplay;