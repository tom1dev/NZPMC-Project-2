import styles from '../../styles/Landing.module.css'
import styleCreateEvent from '../../styles/CreateEvent.module.css';
import {useState } from 'react';
import competitionService from '../../services/competitionService.js';


const CreateCompetition = () => {
    const [title,setTitle] = useState('');
    
    const handleVariableChange = (event, setter) =>{
        setter(event.target.value)
    }


    //submits the created event to the database
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title) {
            alert("Please fill out the title to the competition.");
            return;
        }

        try{
            await competitionService.createCompetition({title:title});
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

                <button type="submit" className={styleCreateEvent.eventSubmitButton} >Create Competition</button>
                

            </form>


        </div>
    )

}

export default CreateCompetition;