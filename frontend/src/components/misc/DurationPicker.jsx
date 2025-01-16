
import React, { useState, useEffect } from 'react'
import style from '../../styles/miscItems.module.css'

const DurationPicker = ({ duration, setDuration }) => {
    const [DisplayedDuration, setDisplayedDuration] = useState(duration)
    const [isMinutes, setIsMinutes] = useState(false)

    //if the displayed duration changes, parent dureation state is updated
    useEffect(() => {
        setDuration(convertToMinutes(DisplayedDuration, isMinutes))
    }, [DisplayedDuration])

    //if the isMinutes state changes, the duration is converted to correct format
    useEffect(() => {
        handleDurationChange(DisplayedDuration)
    }, [isMinutes])

    //converts the duration to minutes if it is in hours
    const convertToMinutes = (duration, isMinutes) => {
        if (isMinutes) {
            return duration
        } else {
            return duration * 60
        }
    }

    //sets limits on the duration to be max 24 hours
    const handleDurationChange = (currentDuration) => {
        if (isMinutes && currentDuration > 1440) {
            setDisplayedDuration(1440)
        }
        else if (!isMinutes && currentDuration > 24) {
            setDisplayedDuration(24)
        } else {
            setDisplayedDuration(currentDuration)
        }
    }

    //used to convert string to boolean
    const handleIsMinutesChange = (value) => {
        if (value === "true") {
            setIsMinutes(true)
        } else {
            setIsMinutes(false)
        }
    }

    return (
        <div className={style.durationPickerContainer}>

            <input value={DisplayedDuration} type='number' onChange={(e) => handleDurationChange(e.target.value)} />
            <select value={isMinutes} onChange={(event) => {
                handleIsMinutesChange(event.target.value)
            }}>
                <option value={true}>Minutes</option>
                <option value={false}>Hours</option>
            </select>

            <h2 className={style.durationPickerTitle}>*Max Duration 24 hours</h2>
        </div>
    )
}

export default DurationPicker;