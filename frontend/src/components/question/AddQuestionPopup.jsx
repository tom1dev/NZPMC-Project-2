import style from '../../styles/UserPopup.module.css';
import {useState,useEffect} from 'react';

import competitionService from '../../services/competitionService';

import CreateQuestion from './CreateQuestion';

const AddQuestionPopup = ({competition,setQuestionPopupOpen}) => {

 return (
        <div className={style.popupWindow}>
            <div className={style.popupContainer}>
                
                    <h className={style.popupTitle}>Add Question</h>
                    <h2 className={style.popupParram}>Competition Title:{competition.title}</h2>

                    <CreateQuestion competition={competition}/>

                    <button className={style.popupCloseButton} onClick={(e) => setQuestionPopupOpen(false)}>Close</button>
            </div>

        </div>

    );
}
export default AddQuestionPopup;