import { useState, useEffect } from 'react';

const CountdownTimer = ({ FinishTime, handleTimeout }) => {
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {

        //updates the time every second
        const interval = setInterval(() => {
            handleCurrentTimeLeft();
        }, 1000);
        

        return () => clearInterval(interval);
    }, [])

    //gets the time left until the competition ends
    const handleCurrentTimeLeft = () => {
        let timeLeftMS = FinishTime().getTime() - new Date().getTime();
        
        //if the time is up call the handleTimeout function
        if (timeLeftMS < 10) {
            handleTimeout();
        }

        let hours = Math.floor(timeLeftMS / 3600000);
        let minutes = Math.floor((timeLeftMS % 3600000) / 60000);
        let seconds = Math.floor(((timeLeftMS % 3600000) % 60000) / 1000);

        setTime({
            hours: hours,
            minutes: minutes,
            seconds: seconds
        })
    }

    
    
    
    
    return (
        <div>
            <h2>{time.hours}:{time.minutes}:{time.seconds}</h2>
        </div>
    )


}

export default CountdownTimer;