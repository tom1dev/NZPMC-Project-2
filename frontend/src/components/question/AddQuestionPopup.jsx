import style from '../../styles/UserPopup.module.css';
import {useState,useEffect} from 'react';

const AddQuestionPopup = ({setQuestionPopupOpen}) => {

 return (
        <div className={style.popupWindow}>
            <div className={style.popupContainer}>
                
                    <h className={style.popupTitle}>Add Question</h>
                    <h2 className={style.popupParram}>Competition Title:</h2>

                    <button className={style.popupCloseButton} onClick={(e) => setQuestionPopupOpen(false)}>Close</button>
            </div>

        </div>

    );
}
export default AddQuestionPopup;