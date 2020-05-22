const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log(result)
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
  name:{
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  number: {
    type: Number,
    min : 10000000,
    max : 99999999,
    required: true
  }

})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)


