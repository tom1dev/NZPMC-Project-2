import axios from 'axios';
import cookieService from './cookieService';

const getAllCompetitions = async () => {
    const res =  await axios.get('http://localhost:3001/api/competition',{headers: {'authorization': cookieService.getCookie("token")}});
    console.log(res.data);
    if(res.status === 200){
        return res.data;
    }else if(res.status === 404){
        return null;
    }else{
        throw new Error(res.data.message);
    }
}

const getCompetitionByTitle= async (id) => {
    const res =  await axios.get(`http://localhost:3001/api/competition/${id}`,{headers: {'authorization': cookieService.getCookie("token")}});
    if(res.status === 200){
        return res.data;
    }else if(res.status === 404){
        return null;
    }else{
        throw new Error(res.data.message);
    }
}

const createCompetition = async (competition) => {
    const res =  await axios.post(`http://localhost:3001/api/competition`,competition,{headers: {'authorization': cookieService.getCookie("token")}});
    if(res.status === 201){
        return res.data;
    }else if(res.status === 404){
        return null;
    }else{
        throw new Error(res.data.message);
    }
}

const addEventToCompetition = async (competitionTitle, eventName) => {
    console.log(eventName)
    const res =  await axios.post(`http://localhost:3001/api/competition/${competitionTitle}/events`,eventName,{headers: {'authorization': cookieService.getCookie("token")}});
    if(res.status === 201){
        return res.data;
    }else{
        throw new Error(res.data.message);
    }
}

const addQuestionToCompetition = async (competitionTitle, question) => {
    const res =  await axios.post(`http://localhost:3001/api/competition/${competitionTitle}/questions`,question,{headers: {'authorization': cookieService.getCookie("token")}});
    if(res.status === 201){
        return res.data;
    }else{
        throw new Error(res.data.message);
    }
}

const getQuestionsForCompetition = async (competitionTitle) => {
    const res =  await axios.get(`http://localhost:3001/api/competition/${competitionTitle}/questions`,{headers: {'authorization': cookieService.getCookie("token")}});
    if(res.status === 200){
        return res.data;
    }else{
        throw new Error(res.data.message);
    }
}

export default {getAllCompetitions, getCompetitionByTitle, createCompetition, addEventToCompetition, addQuestionToCompetition,getQuestionsForCompetition};