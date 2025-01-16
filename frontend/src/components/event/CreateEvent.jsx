import styles from '../../styles/Landing.module.css'
import styleCreateEvent from '../../styles/CreateEvent.module.css';
import { useEffect, useState } from 'react';
import eventService from '../../services/eventService.js';


const CreateEvent = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');


    const handleVariableChange = (event, setter) => {
        setter(event.target.value)
    }


    //submits the created event to the database
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !date || !description) {
            alert("Please fill out name,date and description.");
            return;
        }

        try {
            await eventService.createEvent({ name: name, date: date, description: description });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className={styles.createEventContainer}>

            <form className={styleCreateEvent.createEventContainer} onSubmit={handleSubmit}>


                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Name</h2>
                    <input className={styleCreateEvent.parrameterInput} value={name} onChange={(event) => handleVariableChange(event, setName)} />
                </div>

                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Date</h2>
                    <input className={styleCreateEvent.parrameterInput} value={date} placeholder='mm/dd/yyyy' onChange={(event) => handleVariableChange(event, setDate)} />
                </div>
                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Description</h2>
                    <input className={styleCreateEvent.parrameterInput} value={description} onChange={(event) => handleVariableChange(event, setDescription)} />
                </div>

                <button type="submit" className={styleCreateEvent.eventSubmitButton} >Create Event</button>

            </form>
        </div>
    )

}

export default CreateEvent;