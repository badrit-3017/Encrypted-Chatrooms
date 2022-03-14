/************************************************************************************* 
|   Filename: User.js
|
|   Purpose: This file contains the schema and mongoose pre hooks for User documents
|             
|**************************************************************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

/*===================================================================================== 
|   Name: userSchema
|
|   Purpose: This is the schema definition for user documents. User documents only
|            contain email, username and password
|             
|=========================================================================================*/
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true , 'Email cannot be empty'],
        unique:[true, 'Duplicate Emails not allowed'],
        lowercase: true, //we want all email addresses to be stored as lower case
        validate: [isEmail, 'Please enter a valid email'] //isEmail is used to verify email addresses
    },
    username: {
        type: String,
        required: [true , 'Please enter username'],
        unique:[true, 'Duplicate username not allowed'],
        minlength: [6, 'Minimum username length is 6 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password field cannot be empty'],
        minlength: [6, 'Minimum Password length is 6 characters'],
    },
})

/*===================================================================================== 
|   Name: userSchema login method
|
|   Purpose: This function attempts to log in the user. If the authentication is
|            successfull, return the user object. Else return an error object. The
|            error object is parsed by a custom function in userAuth.js
|             
|=========================================================================================*/
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email: email});
    if(user){
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return user;
        }
        throw Error('Wrong password! Try again');
  }
  throw Error('Email address does not match our records.');
};

/*===================================================================================== 
|   Name: userSchema pre hook
|
|   Purpose: This function hashes the password before storing it in the database
|             
|=========================================================================================*/
userSchema.pre('save', async function(next) {
    var user = this;
    const salt = await bcrypt.genSalt(); //generate salt
    const hashedPassword = await bcrypt.hash(user.password, salt); //hash the password with salt
    user.password = hashedPassword; //override current password with hashed password
    next();
});




const User = mongoose.model('user',userSchema);
module.exports = User;