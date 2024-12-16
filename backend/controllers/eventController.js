const eventService = require('../services/eventService')

const getAllEvents = async (request, response) => {
    try{
        const result = await eventService.getEvents()

        if(result){
            response.status(200).json(result)
        }else{
            response.status(404).json({message: 'No events found'})
        }

    }catch(error){
        console.log(error)
        response.status(500()).json({message: error.message})
    }
}

const getEventById = async (request, response) => {
    const eventId = request.params.id

    try{
        const result = await eventService.getEventById(eventId)

        console.log(result);

        if(result && result.length > 0){
            response.status(200).json(result);
        }else{
            response.status(404).json({message: 'Event not found'})
        }

    }catch(error){
        console.log(error)
        response.status(500).json({message: error.message})
    }

}
const getUserAmountbyEventId = async (request, response) => {
    const eventId = request.params.id

    try{
        const result = await eventService.getUserAmountbyEventId(eventId)

        console.log(result)
        if(result){
            response.status(200).json(result);
        }else{
            response.status(404).json({message: 'No users found for event'})
        }

    }catch(error){
        console.log(error)
        response.status(500).json({message: error.message})
    }
}

const createEvent = async (request, response) =>{
    const signedInEmail = request.auth.email
    
    // if(signedInEmail !== "admin"){
    //     response.status(401).json({message: 'Unauthorized'})
    //     return
    // }

    const eventData = request.body

    try{

        const result = await eventService.createEvent(eventData)

        if(result){
            response.status(201).json({message: 'Event created'})
        }else{
            response.status(500).json({message: 'Error creating event'})
        }

    }catch(error){
        console.log(error)
        response.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    getUserAmountbyEventId
}