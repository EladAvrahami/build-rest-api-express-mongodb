const express = require('express')
const router = express.Router()
//set var Subscriber to include subSchema (sub model)
const Subscriber = require('../models/subscriber')

// Getting all
router.get('/', async (req, res) => {
  try{
                      //the model👇
    const subscribers=await Subscriber.find() //wait until get all data of subscribers model to the new 'subscribers' Obj
    res.json(subscribers)//send all sub as a respond
  }catch(err){
    //eror 500 means that our DB (server) not work 
    res.status(500).json({message:err.message})
    
  }

})


// Getting One
// use middleware getSubscriber👇 function 
router.get('/:id',   getSubscriber, (req, res) => {
  //res.send(req.params.id)
  res.send(res.subscriber.name)
})


// Creating one
router.post('/', async (req, res) => {
  //comper new obj to sub model
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    //something wrong with yhe user input
    res.status(400).json({ message: err.message })
  }
})

// Updating One
//use patch - when i only want to change things based on what the user passes me (and not all the var's like in PUT )  
router.patch('/:id', getSubscriber, async (req, res) => {
 
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    //CREATE new sub variable (obj) by the new clients update 
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


/******* function getSubscriber ********* */

/*middleware - see function getSubscriber usages
 that help me save lines in order to do: update delete and get
that needs to get id  */

//  next sees that if we call this move on to the next section of our code
//async becouse we get into the db in this code
async function getSubscriber(req, res, next) {
  //create new variable
  let subscriber
  try {
    //get subscriber by id that the user pass me inside the url 
    subscriber = await Subscriber.findById(req.params.id)
    //check sub exists? 
    if (subscriber == null) {
      //use return to immediately get out of function when user not found(error)
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  //squalls the new sub variable to the subs that the user give u 
  res.subscriber = subscriber
  //after all the validation above go successfully 
  //next allow me move to the next peace of the middleware/req 
  next()
}

module.exports = router