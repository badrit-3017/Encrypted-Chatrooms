/************************************************************************************* 
|   Filename: Message.js
|
|   Written by: Badrit Bin Imran- February 2022
|
|   Purpose: This file contains the schema and mongoose pre hooks for Message documents
|             
|**************************************************************************************/

//import
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {encrypt} = require('../middleware/cryptographer');

/*===================================================================================== 
|   Name: messageSchema
|
|   Purpose: This is the schema definition for message documents. Message documents only
|            contain username, data and timestamp
|             
|=========================================================================================*/
const messageSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true });

/*===================================================================================== 
|   Name: messageSchema pre hook
|
|   Purpose: This function calls the encrypt function to encrypt the message body
|            before it is saved in the database.
|             
|=========================================================================================*/
messageSchema.pre('save', async function(next) {
    var message = this;
    encBody = encrypt(this.body);
    this.body = encBody;
    next();
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;