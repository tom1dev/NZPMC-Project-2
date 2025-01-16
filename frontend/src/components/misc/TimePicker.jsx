

const TimePicker = ({ time, setTime }) => {
    return (
        <input
            type="time"
            value={time}
            onClick={(event) => event.target.select() }
            onChange={(event) => setTime(event.target.value)}
        />
    )
}

export default TimePicker;