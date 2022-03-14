/************************************************************************************* 
|   Filename: cryptographer.js
|
|   Purpose: This file contains encryption and decryption methods.
|             
|**************************************************************************************/

//imports
const crypto = require('crypto');
const { header } = require('express/lib/request');
const config = require('../config');
const key = config.key;
const iv = config.iv;


/*===================================================================================== 
|   Function name: encrypt
|
|   Parameters: body (message body string)
|
|   Return Values: encrypted (encrypted message string)
|
|   Purpose: This function encrypts the message with an aes-256 bit key and a 16 bit
|            initialization vector
|             
|=========================================================================================*/
const encrypt = (body) =>{
    cipher = crypto.createCipheriv('aes-256-cbc',key,iv); 
    encrypted = cipher.update(body,'utf-8','hex'); //output should be in hex format
    encrypted += cipher.final('hex'); //append any remaining uncihpered content to the message (according to docs)
    return encrypted;
}

/*===================================================================================== 
|   Function name: decrypt
|
|   Parameters: body (encrypted message string)
|
|   Return Values: decrypted (decrypted message string)
|
|   Purpose: This function decrypts the message with the same aes-256 bit key and
|            16 bit initialization vector
|             
|=========================================================================================*/
const decrypt = (body) =>{
    decipher = crypto.createDecipheriv('aes-256-cbc',key,iv);
    decrypted = decipher.update(body,'hex','utf-8'); //input is in hex format
    decrypted += decipher.final('utf-8');
    return decrypted;
}

module.exports = {encrypt,decrypt}