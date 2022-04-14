/*subscriber model */

const mongoose = require('mongoose')

//get an object with keys for all its different properties
//required wiil mention that it is necessary to have this property
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subscribedToChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  }
  //default -if not get any determine now date...
})

//export to use          takes tow properties  :name of the model in the database       the schema that corresponds to the model in this file 
module.exports =                  mongoose.model('Subscriber',                             subscriberSchema)

//model give an option to interact directly to the the DB using the subscriberSchema below