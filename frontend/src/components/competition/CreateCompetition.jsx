import styles from '../../styles/Landing.module.css'
import styleCreateEvent from '../../styles/CreateEvent.module.css';
import {useState } from 'react';
import competitionService from '../../services/competitionService.js';
import TimePicker from '../misc/TimePicker.jsx';
import DurationPicker from '../misc/DurationPicker.jsx';

const CreateCompetition = () => {
    const [title,setTitle] = useState('');
    const [date,setDate] = useState('');
    const [startTime,setStartTime] = useState('');
    const [duration,setDuration] = useState('');
    const [endTime,setEndTime] = useState('');
    
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
        <div className={styles.createEventContainer}>
            
            <form   className={styleCreateEvent.createEventContainer} onSubmit={handleSubmit}>
                
                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Title*</h2> 
                    <input className={styleCreateEvent.parrameterInput} value={title}  onChange={(event) =>handleVariableChange(event,setTitle)}/>
                </div>

                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Date</h2>
                    <input className={styleCreateEvent.parrameterInput} value={date} placeholder='mm/dd/yyyy'  onChange={(event) =>handleVariableChange(event,setDate)}/>
                </div>
                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Start Time</h2>
                    <TimePicker time={startTime} setTime={setStartTime}/>
                </div>

                <div className={styleCreateEvent.parrameterBox}>

                    <h2 className={styleCreateEvent.parrameterTitle}>Duration</h2>
                    <DurationPicker duration={duration} setDuration={setDuration}/>
                </div>
                
        
                <div className={styleCreateEvent.parrameterBox}>
                    <h2 className={styleCreateEvent.parrameterTitle}>Date</h2>
                    <input className={styleCreateEvent.parrameterInput} value={date} placeholder='mm/dd/yyyy'  onChange={(event) =>handleVariableChange(event,setDate)}/>
                </div>

                <button type="submit" className={styleCreateEvent.eventSubmitButton} >Create Competition</button>
                

            </form>
           

        </div>
    )

}

export default CreateCompetition;