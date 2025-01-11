
import styles from '../../styles/Questions.module.css'

const EventDropDownList = ({events}) => {


    return (<>
    {
        //for every event in the events array create add it to the display table
        console.log(events)
    }
        <div className={styles.questionsContainer}>
            {events && events.length > 0 ? 
                events.map((event) => {
                    return (
                    <div className={styles.questionContainer}>
                                <h2 className={styles.questionParram}>Name: {event.name}</h2>
                                <h2 className={styles.questionParram}>date: {event.date}</h2>
                    </div>)}): 
                <h2 className={styles.questionParram}>No events to display</h2>}
        </div>

    </>)

}


export default EventDropDownList;