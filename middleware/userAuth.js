/************************************************************************************* 
|   Filename: userAuth.js
|
|   Purpose: This file contains middleware functions for checking username and 
|            verifying user tokens through jwt
|             
|**************************************************************************************/
//imports
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

/*===================================================================================== 
|   Middleware function name: verifySession
|
|   Purpose: This function checks the token cookie in the browser. If the token does not
|            verify or is null, the user is redirected to the login page. This function 
|            is called whenever the user wants to visit the "general" view
|            
|             
|=========================================================================================*/
const verifySession = (request, response, next) => {
    //Get token stored as a cookie
    const token = request.cookies.jwt;
    if(token){
        //Try to verify token
        jwt.verify(token, config.secret, (error, decodedToken)=>{
            //token is present but is not verified. User has to login
            if(error) {
                response.redirect('/login');
            }
            //user identity is verified
            else{
                next();
            }
        });
    }
    //token is null. Redirect user to login view
    else{
        response.redirect('/login');
    }
} 

/*===================================================================================== 
|   Middleware function name: getUsername
|
|   Purpose: This function returns the username of the current logged in user. If
|            user is not logged in returns null.
|             
|=========================================================================================*/
const getUsername = (request, response, next) => {
    response.locals.username = request.cookies.username;
    next();

}

module.exports = {verifySession,getUsername}