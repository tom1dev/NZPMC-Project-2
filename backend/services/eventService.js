const Event = require('../models/eventModel');
const UserEvents = require('../models/usersEventsModel');

const createEvent = async (eventData) => {

    var date = new Date(eventData.date);

    const newEvent = new Event({name: eventData.name, date: date, location: eventData.location, description: eventData.description});

    await newEvent.save().catch(err => {
        console.log(err);
        return false;
    });

    return true;
}

const getEvents = async () => {
    return await Event.find({}).catch(err => {
        return null;
    });
}

const getUserAmountbyEventId = async (eventId) => {
 


    let users = await UserEvents.find({ eventId: eventId }).catch(err => {
        console.log(err);
        return null;
    })

    if(users === null || users.length < 1){ 
        return 0;
    }

    return users.length;


}

const getEventById = async (eventId) => {
    return await Event.find({ _id: eventId }).catch(err => {
        console.log(err);
        return null;
    });
}

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    getUserAmountbyEventId
}








