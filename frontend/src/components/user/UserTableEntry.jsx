import styles from '../../styles/Landing.module.css'
import UserDetailsPopup from './UserDetailsPopup.jsx';
import { useState } from 'react';


const UserTableEntry = ({user}) => {
    const [showPopup, setShowPopup] = useState(false);


    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    return (
        <div className={styles.eventTableListingBox}>
            <h2 className={styles.eventName}>{user.name}</h2>
            <h2 className={styles.eventLocation}>{user.email}</h2>
            <button className={styles.eventViewButton} onClick={()=>{togglePopup()}}>View</button>
            {showPopup && <UserDetailsPopup showPopup={showPopup} togglePopup={togglePopup} user={user}/>}


        </div>
    );



}

export default UserTableEntry;