/************************************************************************************* 
|   Filename: messageController.js
|
|   Purpose: This file contains all routing logic related to message sending
|            and recieving
|             
|**************************************************************************************/

//Imports
const express = require('express');
const Message = require('../models/Message');
const router = express.Router();
const {verifySession} = require('../middleware/userAuth');
const config = require('../config');
const { decrypt } = require('../middleware/cryptographer');

/*===================================================================================== 
|   "GET" method for the General page
|
|   Purpose: This method renders the general chat room. We get all messages documents
|            from the database, decrypt them and send decrypted messages to the generals
|            view.
|             
|=========================================================================================*/
router.get('/general', verifySession, function (request, response) {
  Message.find().sort({createdAt:-1}) //Get all message documents
  .then((result)=>{
    result.forEach(message => { 
      message.body = decrypt(message.body); //Custom function for decryption
    });
    response.render('general',{title: 'Messages', messages:result}); //rendering the views
  })
  .catch((err)=>{
    console.log(err);
  })
});

/*===================================================================================== 
|   "POST" method for the General page
|
|   Purpose: This method encrypts a message to the database and saves it to
|            the database
|             
|=========================================================================================*/
router.post('/general',(request, response) =>{
    const message = new Message(request.body); //creating a new message object
    message.save() //saving to database
    .then((result) => {
      response.redirect('/general'); //refresh page with new data
    })
    .catch((err) =>{
      console.log(err);
    });
  })

module.exports = router;