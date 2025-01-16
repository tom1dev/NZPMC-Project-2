import styles from '../../styles/SideBar.module.css';

const SideBarUserParrams = ({ editUserdetails, userEdittedName, setUserEdittedName, user }) => {

    const handleEditName = (e) => {
        setUserEdittedName(e.target.value);
    }

    return <div className={styles.userInfoParramContainer}>
        <h4 className={styles.userParramTitle}>Name</h4>
        <input className={editUserdetails ? styles.userInput : styles.userParram} value={userEdittedName} onChange={(e) => { handleEditName(e); }} disabled={!editUserdetails} />
        <h4 className={styles.userParramTitle}>Email</h4>
        <p className={styles.userParram}>{user.email}</p>
    </div>;
}

export default SideBarUserParrams;