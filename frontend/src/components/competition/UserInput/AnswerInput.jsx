
import {useState,useEffect} from 'react'
import style from "../../../styles/competitionAnswering.module.css"

const AnswerInput = ({question, setAnswer}) =>{

    const [selectedOption, setSelectedOption] = useState(1);
    useEffect(() =>{

        setAnswer(question.title,1)

    },[]);


    // uses setAnswer to set the answer for the question in the answers map
    const handleChange = (event) => {
      setSelectedOption(event.target.value);
      setAnswer(question.title,event.target.value)
    };


  

    return(
        <div className={style.questionContainer}>

            <h2 className={style.answerTitle}>Question: {question.title}</h2>


            <h3 className={style.answerTitle}>Answer: </h3>

            {/* SHOWS THE  opitions for the answers*/}
            <select className= {style.selecter} value={selectedOption} onChange={handleChange}>
                <option value="1">{question.options[0]}</option>
                <option value="2">{question.options[1]}</option>
                <option value="3">{question.options[2]}</option>
                <option value="4">{question.options[3]}</option>
            </select>

            <p>Your selected answer: {selectedOption}</p>

        </div>
    )

}

export default AnswerInput