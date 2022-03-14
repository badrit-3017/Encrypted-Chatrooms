/******************************************************************** 
|   Filename: app.js
|
|   Purpose: Entry point to the nodejs application "Encrypted Chatrooms"
|            The app uses the middle ware and necessary starting functions
|            and then control goes to authController and messageController
|            to perform routing
|             
|********************************************************************/

//Necessary imports
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const messageController = require('./controllers/messageController');
const authController = require('./controllers/authController');
const config = require('./config');
const { getUsername } = require('./middleware/userAuth');

//Using middleware
app.use(express.static('assets'));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

//At first we connect to mongodb. Upon successful connection we start the app otherwise we log the error
mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//We call the middleware function getUsername to obtain the username of the current logged in user.
app.get('*', getUsername);
app.post('/general', getUsername);

//Rendering the homepage
app.get('/', function (req, res) {
  res.render('index');
});

//Passing the control to the auth or message controllers
app.use(authController);
app.use(messageController);