import styles from '../../styles/Landing.module.css'
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AddQuestionPopup from '../question/AddQuestionPopup.jsx';
import CompetitionDetailsPopup from './CompetitionDetailsPopup.jsx';

const CompetitionEventLinkTableElement = ({competition, handleCompetitionLink}) => {


    return (
    <>

            <div className={styles.eventTableListingBox}>
                
                    <h2 className={styles.eventName}>{competition.title}</h2>

                
                <div className={styles.eventButtonContainer}>
                    <button className={styles.eventViewButton} onClick={(e) => {handleCompetitionLink(competition.title)}}>Link To Event</button>
                </div>
                    
            </div>

    </>



    );



}

export default CompetitionEventLinkTableElement;