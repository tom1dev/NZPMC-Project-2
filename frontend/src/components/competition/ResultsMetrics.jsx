import styles from "../../styles/competitionResults.module.css"
import {useState, useEffect} from 'react';
import { BarChart } from '@mui/x-charts/BarChart'; 
import { use } from "react";

const ResultsMetrics = ({ questions, questionScoreMap ,userScoreMap }) => {
    const[isUserResultsGraph, setIsUserResultsGraph] = useState(false);
    const[textMetrics, setTextMetrics] = useState({
        mean: 0,
        median: 0,
        high: 0,
        low: 0
    });

    useEffect(() => {
        calculateTextMetrics();
    },[userScoreMap]);


    const calculateTextMetrics = () => {

        let newTextMetrics = {
            mean: 0,
            median: 0,
            high: 0,
            low: 0
        }

        if(userScoreMap.size === 0){
            return;
        }

        userScoreMap.values().forEach((value) => {
            newTextMetrics.mean += value/questions.length;
        });

        newTextMetrics.mean = newTextMetrics.mean/userScoreMap.size;

        let sortedValues = Array.from(userScoreMap.values()).sort((a,b) => a-b);
        newTextMetrics.median = sortedValues[Math.floor(sortedValues.length/2)]/questions.length;
        

        newTextMetrics.high = sortedValues[sortedValues.length-1];
        newTextMetrics.low = sortedValues[0];


        setTextMetrics(newTextMetrics);


    }

    const calculateUserResultsByQuad = (quadAmount) => {
        let data = [];
        for(let i = 0; i<quadAmount; i++){
            data.push(0);
        }


        let quadSize = 100/quadAmount;

        userScoreMap.values().forEach((value) => {
            const userPercentage = value/questions.length * 100;
            let quadIndex = Math.floor(userPercentage/quadSize);

            if(quadIndex === quadAmount){
                quadIndex = quadAmount-1;
            }
            data[quadIndex] = data[quadIndex] + 1;
            
                
            }
        );

        return data;
    };

   



        return(
        <div className = {styles.resultsMetricsContainer}> 
            <h1 className = {styles.title}>Results Metrics</h1>
            <div className = {styles.textMetricsContainer}>

                <h2 className = {styles.textMetric}>Mean: {textMetrics.mean} </h2>
                <h2 className = {styles.textMetric}>Median: {textMetrics.median}</h2>
                <h2 className = {styles.textMetric}>High: {textMetrics.high }</h2>
                <h2 className = {styles.textMetric}>Low: {textMetrics.low}</h2>
                <h2 className = {styles.textMetric}>Amount of Participants: {userScoreMap.size}</h2>




            </div>

            {isUserResultsGraph ? 
            <>
                <h2 className = {styles.graphTitle}>User Results Graph</h2>
                <div className = {styles.graphContainer}>
                    
                    <BarChart
                        xAxis={[
                            {
                            label: 'User Result Percentage',
                            id: 'barCategories',
                            data: ['0-20%', '20-40%', '40-60%', '60-80%', '80-100%'],
                            scaleType: 'band',
                            },
                        ]}
                        yAxis={[
                            {
                                label: 'Amount of Participants',
                            }
                        ]}


                        series={[
                            {
                            data: calculateUserResultsByQuad(5),
                            },
                        ]}
                    />
                </div>
            </>:
            <> 
            
            
                <h2 className = {styles.graphTitle}>Question Results Graph</h2>
                    {console.log(questionScoreMap)}
                <div className = {styles.graphContainer}>
                    <BarChart
                        xAxis={[
                            {
                                label: 'Question Name',
                            id: 'barCategories',
                            data: Array.from(questionScoreMap.keys()),
                            scaleType: 'band',
                            },
                        ]}
                        yAxis={[
                            {
                                label: 'Total Times Answered Correctly',
                            }
                        ]}

                        series={[
                            {
                            data: Array.from(questionScoreMap.values()),
                            },
                        ]}
                    />
                </div>
            
            </>}
            
            <button className = {styles.toggleButton} onClick = {() => setIsUserResultsGraph(!isUserResultsGraph)}>{isUserResultsGraph ? "Show Question Results Graph" : "Show User Results Graph"}</button>
           
        </div>);
}

export default ResultsMetrics;

