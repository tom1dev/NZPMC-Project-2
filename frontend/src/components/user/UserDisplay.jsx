
import styles from '../../styles/Landing.module.css'
import { useEffect,useState } from 'react';
import UserTableEntry from './UserTableEntry.jsx'
import userService from '../../services/userService.js';


const UserDisplay = () =>{
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers();
    },[]);


    const fetchUsers = async () => {
        try{
            const users = await userService.getAllUsers();
            setUsers(users);
        }catch (error){
            console.log(error);
        }
    }

    return(<>


        <div className={styles.eventsContainer}>

            <h2 className={styles.eventTitle}>Users</h2>
           
            <div className={styles.eventViewTitleBox}>
                <h2 className={styles.eventTitleName}>Name</h2>
                <h2 className={styles.eventTitleLocation}>Email</h2>
            </div>
            {users.map((user) => { return <UserTableEntry key={user.id} user = {user}/>})}
        </div>
    
    </>)

}


export default UserDisplay;