/************************************************************************************* 
|   Filename: authController.js
|
|   Purpose: This file contains all routing logic related to user
|            authentication
|             
|**************************************************************************************/

//Imports
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const config = require('../config');
var jwt = require('jsonwebtoken');

/*===================================================================================== 
|   Function name: customErrorHandler
|
|   Parameters: data (error messages/codes)
|
|   Return Values: errors (custom error string)
|
|   Purpose: This function parses error messages/codes encountered
|            while error handling the authentication process. It then
|            creates an error string which notifies the user of the 
|            error
|             
|=========================================================================================*/
function customErrorHandler(data) {
  //Declaring string to be returned
  errors = '';
  //Error code for duplicate data
  if(data.code==11000){
     errors += 'Sorry, duplicate user names or emails not allowed. '
  }
  //Errors related to registration (wrong input type)
  else if(data.message){
     errors += data.message;
  }
  //Login errors
  if(data.errors){
    Object.values(data.errors).forEach(properties => {
      errors += properties.message + ' ';
  });
  }
  //Logging errors and returning the string
  console.log(errors);
  return errors;
}

/*===================================================================================== 
|   "GET" method for login page
|
|   Purpose: This method renders the login page        
|             
|=========================================================================================*/
router.get('/login', function (request, response) {
  response.render('login');
});


/*===================================================================================== 
|   "POST" method for login page
|
|   Purpose: This method handles user authentication and error checking
|            during the login process     
|             
|=========================================================================================*/
router.post('/login',async function (request, response) {
  const {email, password} = request.body;
  try {
      const user = await User.login(email, password); //creating the user
      const token =  jwt.sign({ data:user._id}, config.secret, {expiresIn: '48h'}); //signing jwt token
      response.cookie('jwt',token, { maxAge: 86400*2*10000, httpOnly: true }); //setting the token as a cookie
      response.cookie('username',user.username, { maxAge: 86400*2*1000, httpOnly: true }); //setting username as a cookie
      response.status(200).json({user:user.id}) //user successfully logged in
  } catch (err) {
      errors = customErrorHandler(err); //getting back error string from error handler function
      response.status(200).json({errors}); //display errors
  }
});

/*===================================================================================== 
|   "GET" method for registration page
|
|   Purpose: This method renders the registration page        
|             
|=========================================================================================*/
router.get('/register', function (request, response) {
  response.render('register');
});

/*===================================================================================== 
|   "POST" method for registration page
|
|   Purpose: This method handles user creation and error checking
|            during the registration process     
|             
|=========================================================================================*/
router.post('/register',async function (request, response) {
  //getting user credentials
  const email = request.body.email;
  const username = request.body.username;
  const password = request.body.password; //password will be hashed later with a mongoose pre hook
  
  try {
    const user = await User.create({email,username, password}); //creating users 
    const token =  jwt.sign({ data:user._id}, config.secret, {expiresIn: '48h'}); //signing the jwt token
    response.cookie('jwt',token, { maxAge: 86400*2*1000, httpOnly: true }); //setting the token as a cookie
    response.cookie('username',username, { maxAge: 86400*2*1000, httpOnly: true }); //setting username as a cookie
    response.status(200).json({user:user.id}) //successfull login. Send user id
  } catch (err) {
    errors = customErrorHandler(err); //getting error string from error handler
    response.status(200).json({errors}); //unsuccessfull login, send error string
  }
});

/*===================================================================================== 
|   "GET" method for logout page
|
|   Purpose: This method handles user logout by resetting all cookies and redirecting
|            user to the homepage.
|             
|=========================================================================================*/
router.get('/logout', function (request, response) {
  response.cookie('jwt', '',{maxAge:1});
  response.cookie('username', '',{maxAge:1});
  response.redirect('/');
});

module.exports = router;