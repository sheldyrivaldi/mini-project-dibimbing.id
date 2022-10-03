const express = require('express')
const auth = require('basic-auth')
const app = express()
require('dotenv').config()
app.use(express.json())

// Global Variable
    const username = process.env.USERNAME_BASIC_AUTH
    const password = process.env.PASSWORD_BASIC_AUTH

// Middleware with Basic Auth
app.use('/',  (req, res, next)=> {
if(auth(req) == undefined || auth(req).name !== username || auth(req).pass !== password){
   return res.status(403).json({
        message: "Not Authorized!"
    }) 
    
} next()
})

module.exports = app