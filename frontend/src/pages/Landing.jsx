import styles from '../styles/Landing.module.css'
import { useEffect, useState } from 'react';
import LoggedOutNotification from '../components/signIn/loggedOutNotification.jsx'
import EventDisplay from '../components/event/EventDisplay.jsx'
import SideBar from '../components/sideBar/SideBar.jsx';

import userService from '../services/userService';


const Landing = () => {
    const [user, setUser] = useState({});


    //gets user information with its auth cookie
    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const user = await userService.getUserByToken();
                setUser(user[0]);
            } catch (error) {
                console.log("Error fetching user information", error);
            }
        }

        fetchUserInformation();

    }, []);




    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.sidebarContainer}>
                <SideBar user={user} setUser={setUser} />
            </div>
            <div className={styles.landingContentContainer}>
                <h1 className={styles.landingPageTitle}>Event signup</h1>
                
                {/*if user is not logged in, display a notification*/}
                {!user.name && <LoggedOutNotification />}
                
                <EventDisplay user={user} />
            </div>
        </div>
    )
};

export default Landing;