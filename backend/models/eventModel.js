const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    id: String,
    name: String,
    date: Date,
    location: String,
    description: String,
    numEnrollies: Number
})

eventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      returnedObject.date = new Date(returnedObject.date).toLocaleDateString()    
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Event', eventSchema)