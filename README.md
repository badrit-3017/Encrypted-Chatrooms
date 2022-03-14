# Encrypted Chatrooms                
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)     ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

Encrypted chatroom is a messaging app that provides end to end encryption for user messages. It is a nodejs app made with express. This app uses MongoDB as the database.  User messages are encrypted with AES 256 bit keys.

## Installation
You will need to install [nodejs](https://nodejs.dev/). Get all dependencies by:
```bash
$ npm install
```
Please check the config file for instructions to set different global variables like the database connection string.

## Build
This app uses [nodemon](https://www.npmjs.com/package/nodemon). Nodemon is a tool that wraps nodejs applications and automatically restarts whenever changes are applied. So to build the app:
```bash
$ nodemon app
```

## Usage
Go to your browser and type in http://localhost:3000/ to access the app (3000 is the default port for express)

