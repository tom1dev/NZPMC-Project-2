import styles from '../../styles/Landing.module.css'
import { Outlet, Link } from "react-router-dom";


const LoggedOutNotification = ()=>{

    return(
        <div className={styles.loggedOutNotificationContainer}>
            <h2 className={styles.h2}>You are currently signed out to register for events please sign in  </h2>
            <Link className={styles.signInLink} to="/Signin">Sign In or Sign Up.</Link>         
        </div>
    );

}

export default LoggedOutNotification;



