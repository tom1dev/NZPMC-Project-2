import styles from '../../styles/SideBar.module.css';


const SideBarUserButtons = ({editUserdetails,user, handleSave, setUserEdittedName, setEditUserDetails}) => {
    
    const handleEdit = () => {
        setEditUserDetails(!editUserdetails);
    }

    //reverts the user name back to the one in the database
    const handleEditCancel = () => {
        console.log("Cancel Clicked");
        setEditUserDetails(!editUserdetails);
        setUserEdittedName(user.name);
    }

    return <div className={styles.buttonContainer}>
        {editUserdetails ?
            <>
                <button className={styles.userSaveButton} onClick={(e) => { handleSave(); } }>save</button>
                <button className={styles.userCancelButton} onClick={(e) => { handleEditCancel(); } }>cancel</button>
            </>
            : <button className={styles.userEditButton} onClick={(e) => { handleEdit(); } }>edit</button>}
    </div>;
}

export default SideBarUserButtons;