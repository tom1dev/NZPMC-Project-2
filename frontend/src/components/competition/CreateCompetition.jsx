import styles from '../../styles/Landing.module.css'
import styleCreateEvent from '../../styles/CreateEvent.module.css';
import { useEffect,useState } from 'react';
import eventService from '../../services/eventService.js';


const CreateEvent = () => {
    const [title,setTitle] = useState('');
    const [eventName,setEventName] = useState('');
    
    const handleVariableChange = (event, setter) =>{
        setter(event.target.value)
    }


    //submits the created event to the database
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !date || !description) {
            alert("Please fill out name,date and description.");
            return;
        }

        try{
            await eventService.createEvent({name:name,date: date,description: description});
            window.location.reload();
        }catch (error){
            console.log(error);
        }

    }

    return (
        <div className={styles.eventsContainer}>
            <h2 className={styles.eventTitle}>Create Competition</h2>
            
            <form   className={styleCreateEvent.createEventContainer} onSubmit={handleSubmit}>
                
                
                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Title*</h2> 
                    <input className={styleCreateEvent.parrameterInput} value={title}  onChange={(event) =>handleVariableChange(event,setTitle)}/>
                </div>

                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Link to Event</h2>
                    <input className={styleCreateEvent.parrameterInput} value={eventName}  onChange={(event) =>handleVariableChange(event,setEventName)}/>
                </div>

                <button type="submit" className={styleCreateEvent.eventSubmitButton} >Create Competition</button>
                


            </form>


        </div>
    )

}

export default CreateEvent;