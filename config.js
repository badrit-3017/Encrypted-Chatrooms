/******************************************************************** 
|   Filename: config.js
|
|   Purpose: Contains different global variables used by the app.
|             
|********************************************************************/

var config ={}
//Replace myFirstDatabase with the name of the database. And replace <password> and user with your username and password. 
config.dbURI = 'mongodb+srv://user:<password>@nodelearn.cmrcg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
config.secret = 'yourSecretStringHere'; //secret string used by jwt. 
config.key = 'your key here'; //randomly generated key
config.iv = 'your random IV here'; //iv must be in hex and 16 characters long
module.exports = config;