import style from '../../styles/UserPopup.module.css';
import {useState,useEffect} from 'react';

import competitionService from '../../services/competitionService';
import Dropdown from '../misc/Dropdown';

import CreateQuestion from './CreateQuestion';
import QuestionDisplay from './QuestionDisplay';

const AddQuestionPopup = ({competition,setQuestionPopupOpen}) => {
    const [questions, setQuestions] = useState([]);


    useEffect(() => {




    },[]);


 return (
        <div className={style.popupWindow}>
            <div className={style.popupContainer}>
                
                    <h className={style.popupTitle}>Add Question</h>
                    <h2 className={style.popupParram}>Competition Title:{competition.title}</h2>
                    
                    <Dropdown DropdownTitle="Add An Exsisting Question">
                                <QuestionDisplay questions={questions}/>
                    </Dropdown>


                    <CreateQuestion competition={competition}/>

                    <button className={style.popupCloseButton} onClick={(e) => setQuestionPopupOpen(false)}>Close</button>
            </div>

        </div>

    );
}
export default AddQuestionPopup;