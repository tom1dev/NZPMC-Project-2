import styles from '../../../styles/Landing.module.css'

const CompetitionEventLinkTableElement = ({ competition, handleCompetitionLink }) => {
    return (
        <>

            <div className={styles.eventTableListingBox}>

                <h2 className={styles.eventName}>{competition.title}</h2>

                {
                    //button links the competition to the event via the handleCompetitionLink function
                }
                <div className={styles.eventButtonContainer}>
                    <button className={styles.eventViewButton} onClick={(e) => { handleCompetitionLink(competition.title) }}>Link To Event</button>
                </div>

            </div>

        </>
    );
}

export default CompetitionEventLinkTableElement;