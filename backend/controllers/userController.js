const userService = require('../services/userService');


const getAllUsers = async (request, response) => {
    try {
        const signedInEmail = request.auth.email;
    
        if(!signedInEmail.match("admin")){
            response.status(403).json({message: 'Unauthorized'})
            return
        }
        
        const users = await userService.getAllUsers();
        console.log(users);
        if(!users || users.length < 0){
            return response.status(404).send("User not found");
        }
            
        return response.status(200).json(users);
        

    } catch (error) {
        response.status(500).send(error.message);
        console.log(error);
    }
}


const getUserById = async (request, response) => {
   

    try {
        const signedInEmail = request.auth.email;

        const userId = request.params.id;

        const user = await userService.getUserById(userId);


        if(user==null || user==undefined || user.length< 1){
            response.status(404).send("User not found");
        }else if(signedInEmail === "admin" || signedInEmail.match(user[0].email)){
            response.status(200).json(user);
            return
        }else{
            response.status(403).json({message: 'Unauthorized'})
            return
        }

    } catch (error) {
        response.status(500).send(error.message);
        console.log(error);
    }
}

const getUserByToken = async (request, response) => {

    try {
        const signedInEmail = request.auth.email;

        const user = await userService.getUserByEmail(signedInEmail);


        if(user==null || user==undefined || user.length< 1){
            response.status(404).send("User not found");
        }else{
            response.status(200).json(user);
            return
        }

    } catch (error) {
        response.status(500).send(error.message);
        console.log(error);
    }


}


const createUser = async (request, response) => {
    const user = request.body;

    try {

        const getUserByEmail = await userService.getUserByEmail(user.email);

        if(getUserByEmail && getUserByEmail.length > 0){
            response.status(400).send("User with this email already exists");
            return
        }
        
        const accessToken = await userService.createUser(user);
        
        if(accessToken){
            response.status(201).json(accessToken);
        }else{
            response.status(400).send("User not created");
        }

    } catch (error) {
        response.status(500).send(error.message);
        console.log(error);
    }
}

const updateUser = async (request, response) => {
    const user = request.body;
    const userId = request.params.id;

    try{
        const signedInEmail = request.auth.email;
        
        if(signedInEmail !== "admin" && !signedInEmail.match(user.email)){
            response.status(403).json({message: 'Unauthorized'})
            return
        }


        const updatedUser = await userService.updateUser(userId,user);
        
        if(updatedUser){
            console.log(updatedUser);
            response.status(200).json(updatedUser);
        }else{
            response.status(404).send("User not found");
        }
    } catch (error) {
        response.status(500).send(error.message);
        console.log(error);
    }
}

const getUserEvents = async (request, response) => {
    try {
        const signedInEmail = request.auth.email;


        const userId = request.params.id;

        const user = await userService.getUserById(userId);

        console.log(userId);

        if(signedInEmail !== "admin" && !signedInEmail.match(user[0].email)){
            response.status(403).json({message: 'Unauthorized'})
            return
        }



        const events = await userService.getUserEvents(userId);
        if(events){
            response.status(200).json(events);
        }
        else{
            response.status(404).send("No events found for this user");
        }
    } catch (error) {
        console.log(error);
        response.status(500).send(error.message);
    }
}

const addUserEvent = async (request, response) => {
    try {
        const signedInEmail = request.auth.email;

        const userId = request.params.id;

        const user = await userService.getUserById(userId);

        if(signedInEmail !== "admin" && !signedInEmail.match(user[0].email)){
            response.status(403).json({message: 'Unauthorized'})
            return
        }

        const eventId = request.body.eventId;
        const userEvents = await userService.addUserEvent(userId, eventId);
        if(userEvents){
            response.status(200).json(userEvents);
        }else{
            response.status(404).send("User or event not found");
        }
    } catch (error) {
        console.log(error);
        response.status(500).send(error.message);
    }
}

module.exports = {
    getUserByToken,
    getAllUsers,
    getUserById,
    createUser,
    getUserEvents,
    addUserEvent,
    updateUser
}