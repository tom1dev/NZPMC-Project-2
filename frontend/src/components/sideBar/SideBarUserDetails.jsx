import styles from '../../styles/SideBar.module.css';
import { useState, useEffect } from 'react';
import userService from '../../services/userService.js';

import SideBarUserParrams from './SideBarUserParrams.jsx';
import SideBarUserButtons from './SideBarUserButtons.jsx';
import { use } from 'react';

const SideBarUserDetails = ({user, setUser}) =>{
    const [editUserdetails, setEditUserDetails] = useState(false);
    const [userEdittedName, setUserEdittedName] = useState(user.name);

    //update the user's name in the input field
    useEffect(() => {
        setUserEdittedName(user.name);
    }, [user]);

    //save the users new name to the database
    const handleSave  = async() => { 
        console.log("Save Clicked");
        try {
            const res = await userService.updateUser(user.email, {name: userEdittedName});
            setUser(user => ({...user, name: userEdittedName}));
            console.log('User updated:', res);
        } catch (error) {
            console.log('Error updating user:', error);
        }
        setEditUserDetails(!editUserdetails);
    }

    return <div className={styles.userInfoContainer}>

        <h3 className={styles.userInfoTitle}>Account Details</h3>

        <SideBarUserParrams editUserdetails={editUserdetails} userEdittedName={userEdittedName} setUserEdittedName={setUserEdittedName} user={user} />
        <SideBarUserButtons editUserdetails={editUserdetails} user={user} handleSave = {handleSave} setUserEdittedName = {setUserEdittedName} setEditUserDetails ={setEditUserDetails} />

    </div>;
}

export default SideBarUserDetails;