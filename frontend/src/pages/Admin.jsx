import styles from '../styles/Landing.module.css'
import { createContext,useEffect, useState } from 'react';
import CreateEvent from '../components/event/CreateEvent.jsx';
import EventDisplay from '../components/event/EventDisplay.jsx'
import SideBar from '../components/sideBar/SideBar.jsx';
import UserDisplay from '../components/user/UserDisplay.jsx';
import { useNavigate } from "react-router-dom";
import CreateCompetition from '../components/competition/CreateCompetition.jsx';
import CompetitionDisplay from '../components/competition/CompetitionDisplay.jsx';
import Dropdown from '../components/misc/Dropdown.jsx';
import userService from '../services/userService';
const Admin = () => {
    //allows for navigation to other pages
    const navigate = useNavigate();

    const [user, setUser] = useState();
    
    

    //gets user information with its auth cookie and verifies user page access
    useEffect(() => {

        const fetchUserInformation = async () => {
            try {
                const user = await userService.getUserByToken();
                if (!user || user.length < 1 || user[0].email !== "admin") {
                    navigate("/");
                }

                setUser(user[0]);

            } catch (error) {
                navigate("/");
                console.log(error);
            }
        }

        fetchUserInformation();
    }, []);

    const Child = () =>{
        return (
            <div>
                <h1>Test</h1>
            </div>
        )
    };


    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.sidebarContainer}>
                <SideBar user={user} setUser={setUser} />
            </div>
            <div className={styles.landingContentContainer}>
                <h1 className={styles.landingPageTitle}>Admin Page</h1>
                <UserDisplay />
                <CreateCompetition />
                <CompetitionDisplay />
                <CreateEvent />
                <EventDisplay />

            </div>
        </div>
    )
};


export default Admin;