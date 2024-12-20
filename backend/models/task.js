const mongoose = require("mongoose") 

const taskSchema = mongoose.Schema({

    title:{
      type: String,
      required:true,
    },
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
    
})

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Task', taskSchema)