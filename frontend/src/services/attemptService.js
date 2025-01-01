import axios from 'axios';
import cookieService from './cookieService';

const getAllUserAttempts = async (userEmail) => {
    const res =  await axios.get(`http://localhost:3001/api/attempt/${userEmail}`,{headers: {'authorization': cookieService.getCookie("token")}});
    console.log(res.data);
    if(res.status === 200){
        return res.data;
    }else if(res.status === 404){
        return null;
    }else{
        throw new Error(res.data.message);
    }
}

const getAllCompetitionEvents = async (competitionId) => {
    const res =  await axios.get(`http://localhost:3001/api/attempt/competition/${competitionId}`,{headers: {'authorization': cookieService.getCookie("token")}});
    console.log(res.data);
    if(res.status === 200){
        return res.data;
    }else if(res.status === 404){
        return null;
    }else{
        throw new Error(res.data.message);
    }
}

const getAttempt = async (userEmail, competitionName) => {
    const res =  await axios.get(`http://localhost:3001/api/attempt/${userEmail}/${competitionName}`,{headers: {'authorization': cookieService.getCookie("token")}});
    console.log(res.data);
    if(res.status === 200){
        return res.data;
    }else if(res.status === 404){
        return null;
    }else{
        throw new Error(res.data.message);
    }
}

const addAttempt = async (attempt) => {

    const res =  await axios.post('http://localhost:3001/api/attempt',attempt,{headers: {'authorization': cookieService.getCookie("token")}});
    console.log(res.data);
    if(res.status === 200){
        return res.data;
    }else{
        throw new Error(res.data.message);
    }
}

export default {getAllUserAttempts,getAttempt,addAttempt, getAllCompetitionEvents}
 