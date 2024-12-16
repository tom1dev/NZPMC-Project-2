const mongoose = require('mongoose')

const UsersEventSchema = new mongoose.Schema({
    id: String,
    userId: String,
    eventId: String
})

UsersEventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('UsersEvents', UsersEventSchema)