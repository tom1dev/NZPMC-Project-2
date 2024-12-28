import styles from '../../styles/Landing.module.css'
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AddQuestionPopup from '../question/addQuestionPopup.jsx';
import CompetitionDetailsPopup from './CompetitionDetailsPopup.jsx';

const CompetitionTableEntry = ({competition}) => {
    const [viewPopupOpen, setViewPopupOpen] = useState(false);
    const [questionPopupOpen, setQuestionPopupOpen] = useState(false);

    //enrolls the user to the event
    const togglePopup = (val, setter) => {
        console.log("togglePopup Clicked");
        setter(!val);
    }



    return (
    <>

            <div className={styles.eventTableListingBox}>
                <h2 className={styles.eventName}>{competition.title}</h2>
                <h2 className={styles.eventDate}>{competition.QuestionIds?competition.QuestionIds.size():0 }</h2>

                <button className={styles.eventViewButton} onClick={(e) => {togglePopup(questionPopupOpen,setQuestionPopupOpen)}}>AddQuestion</button>
                <button className={styles.eventViewButton} onClick={(e) => {togglePopup(viewPopupOpen,setViewPopupOpen)}}>View</button>
            </div>

            {
                questionPopupOpen &&
                <AddQuestionPopup setQuestionPopupOpen= {setQuestionPopupOpen} competition ={competition}/>

            }

            {
                viewPopupOpen &&
                <CompetitionDetailsPopup setViewPopupOpen= {setViewPopupOpen} competition ={competition}/>
            }

    </>



    );



}

export default CompetitionTableEntry;