
import React, { useState, useEffect } from 'react'
import style from '../../styles/miscItems.module.css'

const DurationPicker = ({ duration, setDuration }) => {
    const [DisplayedDuration, setDisplayedDuration] = useState(duration)
    const [isMinutes, setIsMinutes] = useState(true)

    useEffect(() => {
        handleDurationChange(DisplayedDuration)
    }, [DisplayedDuration,isMinutes])

    const convertToMinutes = (duration, isMinutes) => {
        if (isMinutes) {
            return duration
        } else {
            return duration * 60
        }
    }

    const handleDurationChange = (currentDuration) => {

        if(isMinutes && currentDuration > 1440){
            setDisplayedDuration(1440) 
        }
        else if(!isMinutes && currentDuration > 24){    
            setDisplayedDuration(24)
        }else{
            setDisplayedDuration(event.target.value)
        }

        setDuration(convertToMinutes(DisplayedDuration, isMinutes))
    }

    return (
        <div className={style.durationPickerContainer}>
            
            <input value={DisplayedDuration} type='number'  onChange={(e)=> handleDurationChange(e.target.value)}/>
            <select value={isMinutes} onChange={(event) => {
                if(event.target.value === 'true'){
                    setIsMinutes(true)
                }else{
                    setIsMinutes(false)
            }}}>
                <option value={true}>Minutes</option>
                <option value={false}>Hours</option>
            </select>

            <h2 className={style.durationPickerTitle}>*Max Duration 24 hours</h2>
        </div>
    )
}

export default DurationPicker;