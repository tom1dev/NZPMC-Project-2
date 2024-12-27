
import styles from '../../styles/SideBar.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cookieService from '../../services/cookieService.js';
import SideBarUserDetails from './SideBarUserDetails.jsx';
import ButtonContainer from './ButtonContainer.jsx';


const SideBar = ({user, setUser}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);



    //updates sidebar elements depending on user login status
    useEffect(() => {
        console.log();
        if (!user ||!user.name || user.length < 1) {
            setIsLoggedIn(false); 
        } else {
            setIsLoggedIn(true); 

            if(user.name === 'admin'){
                setIsAdmin(true);
            }

        }
    }, [user]); 

    //reload the page and delete the user auth cookie
    const handelSignout = () => {
        cookieService.deleteCookie('token');
        window.location.reload();
    }
    



    return (
        <div className={styles.sidebarContainer}>

            <h1 className={styles.logo}>NZPMC</h1>
            
            {/*show login or sign in button*/}
            {   isLoggedIn ?
                <>
                    <SideBarUserDetails  user = {user} setUser ={setUser}/>

                    <button className={styles.signIn} onClick={(e) => {handelSignout()}}>Signout</button>
                </>
                :<Link className={styles.signIn} to='../signin'>Sign in</Link>

                

            }
            <ButtonContainer isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>



        </div>
    );
}





export default SideBar;