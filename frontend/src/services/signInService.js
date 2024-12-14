import axios from 'axios';

//this checks the user's credentials and returns the a new auth token
const signIn = async (email, password) => {
    const res = await axios.post('http://localhost:3001/api/signin', {email, passwordHash: password}).catch(error => {
        throw new Error( error.response.data);
    });

    if(res.status === 200){
        return await res.data;
    }else{
        throw new Error(res.data.message);
    }


}

export default {signIn};