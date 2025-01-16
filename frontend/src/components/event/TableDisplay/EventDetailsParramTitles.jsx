import styles from '../../../styles/Landing.module.css'


const EventDetailsParramTitles = () => {
    return(<div className={styles.eventViewTitleBox}>
        <h2 className={styles.eventTitleName}>Name</h2>
        <h2 className={styles.eventTitleDate}>Date</h2>
    </div>);
}

export default EventDetailsParramTitles;