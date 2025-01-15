
import React, { useState, useEffect } from 'react'
import style from '../../styles/miscItems.module.css'

const DurationPicker = ({ duration, setDuration }) => {
    const [DisplayedDuration, setDisplayedDuration] = useState(duration)
    const [isMinutes, setIsMinutes] = useState(false)

    useEffect(() => {
        setDuration(convertToMinutes(DisplayedDuration, isMinutes))
    }, [DisplayedDuration])

    useEffect(() => {
        handleDurationChange(DisplayedDuration)
    }, [isMinutes])

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
            setDisplayedDuration(currentDuration)
        }
    }

    const handleIsMinutesChange = (value) => {
        if(value === "true"){
            setIsMinutes(true)
        }else{
            setIsMinutes(false)
        }
    }

    return (
        <div className={style.durationPickerContainer}>
            
            <input value={DisplayedDuration} type='number'  onChange={(e)=> handleDurationChange(e.target.value)}/>
            <select value={isMinutes} onChange={(event) => {
                handleIsMinutesChange(event.target.value)}}>
                <option value={true}>Minutes</option>
                <option value={false}>Hours</option>
            </select>

            <h2 className={style.durationPickerTitle}>*Max Duration 24 hours</h2>
        </div>
    )
}

export default DurationPicker;