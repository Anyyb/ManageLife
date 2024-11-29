const mongoose = require('mongoose')

const incomeSchema = mongoose.Schema({

    title:{
        type: String,
        required: true,    
    },
    income:{
        type: Number,
        required: true
    },
    user: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
]
})

incomeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Income', incomeSchema)

