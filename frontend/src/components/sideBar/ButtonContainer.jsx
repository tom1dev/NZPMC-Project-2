import { use } from "react";
import styles from '../../styles/SideBar.module.css';
import { Link } from 'react-router-dom';


const ButtonContainer = ({isAdmin, isLoggedIn}) => {


    return (
            <div>
                {isAdmin && 
                <>
                    <button className={styles.signIn} onClick={(e) => { } }>Users</button>
                    <button className={styles.signIn} onClick={(e) => {  } }>Events</button>
                    <button className={styles.signIn} onClick={(e) => {  } }>Competition</button>
                </>}

                {isLoggedIn ?
                        <button className={styles.signIn} onClick={(e) => {}}>Signout</button>
                        :<Link className={styles.signIn} to='../signin'>Sign in</Link>}
            </div>
    );

}

export default ButtonContainer;