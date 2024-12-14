import axios from 'axios';
import cookieService from './cookieService';

const getAllUsers = async () => {
    const res = await axios.get('http://localhost:3001/api/user/',{headers: {'authorization': cookieService.getCookie("token")}}).catch(error => {
        throw new Error(error.response.data);
    });

    if(res.status === 200){
        return res.data;
    }  else if(res.status === 401){
        throw new Error("Unauthorized cannot access this endpoint");
    }  else if(res.status === 403){
        throw new Error("User not authorized to get all users");
    }else{
        throw new Error(res.data.message);
    }
}

//uses the auth token in cookies to get the user information
const getUserByToken = async () => {
    const res = await axios.get('http://localhost:3001/api/user/mydetails',{headers: {'authorization': cookieService.getCookie("token")}}).catch(error => {
        throw new Error(error.response.data);
    });
    
    if(res.status === 200){
        return res.data;
    } else if(res.status === 401){
        throw new Error("Unauthorized cannot access this endpoint");
    }else{
        throw new Error(res.data.message);
    }
}

const getUserById = async (id) => {
    const res = await axios.get('http://localhost:3001/api/user',id,{headers: {'authorization': cookieService.getCookie("token")}}).catch(error => {
        throw new Error(error.response.data);
    });
    
    if(res.status === 200){
        return res.data;
    }  else if(res.status === 401){
        throw new Error("Unauthorized cannot access this endpoint");
    }  else if(res.status === 403){
        throw new Error(`User not authorized to get user: ${id} `);
    }else{
        throw new Error(res.data.message);
    }
}

const createUser = async (user) => {
    const res = await axios.post('http://localhost:3001/api/user',user,{headers: {'authorization':cookieService.getCookie("token")}}).catch(error => {
        throw new Error(error.response.data);
    });
    
    if(res.status === 201){
        return res.data;
    }  else if(res.status === 401){
        throw new Error("Unauthorized cannot access this endpoint");
    }  else if(res.status === 400){
        throw new Error(res.data.message);
    }else{
        throw new Error(res.data.message);
    }
}

const updateUser = async (id, user) => {
    const res = await axios.patch(`http://localhost:3001/api/user/${id}`,user,{headers: {'authorization': cookieService.getCookie("token")}}).catch(error => {
        throw new Error(error.response.data);
    });
    
    if(res.status === 200){
        return res.data;
    }  else if(res.status === 401){
        throw new Error("Unauthorized cannot access this endpoint");
    }  else if(res.status === 403){
        throw new Error(`User not authorized to update user: ${id} `);
    }else{
        throw new Error(res.data.message);
    }

}


//gets all the events that the user has joined
const getEventsByUserId = async (id) => {
    const res = await axios.get(`http://localhost:3001/api/user/${id}/events`,{headers: {'authorization': cookieService.getCookie("token")}}).catch(error => {
        throw new Error(error.response.data);
    });
    
    if(res.status === 200){
        return await res.data;
    }  else if(res.status === 401){
        throw new Error("Unauthorized cannot access this endpoint");
    }  else if(res.status === 403){
        throw new Error(`User not authorized to get events for user: ${id} `);
    }else{
        throw new Error(res.data.message);
    }
}

//adds a user to an event
const addUserToEvent = async (userId, eventId) => {
    const res = await axios.post(`http://localhost:3001/api/user/${userId}/events`, {eventId},{headers: {'authorization': cookieService.getCookie("token")}}).catch(error => {
        throw new Error(error.response.data);
    });

    if(res.status === 200){
        return res.data;
    }  else if(res.status === 401){
        throw new Error("Unauthorized cannot access this endpoint");
    }  else if(res.status === 403){
        throw new Error(`User not authorized to add user: ${userId} to event: ${eventId}`);
    }else if(res.status === 404){
        throw new Error("User or event not found");
    }else{
        throw new Error(res.data.message);
    }
}

export default {getAllUsers,
    getUserByToken,
    getUserById,
    createUser,
    updateUser,
    getEventsByUserId,
    addUserToEvent}


