//config will upload all the variables that i created in the .env file 
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
          
           //in order to fit more environments except 'localhost' on run time i will write it in the env file                     
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })//will parse my data  
//create db variable  in order to monitor errors
const db = mongoose.connection
//when error display on console
db.on('error', (error) => console.error(error))
//connect massage 
db.once('open', () => console.log('Connected to Database'))

//middelware to the routing
app.use(express.json())


const subscribersRouter = require('./routes/subscribers')

//'localhost:3000/subscribers/id or something...'
app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('Server Started'))