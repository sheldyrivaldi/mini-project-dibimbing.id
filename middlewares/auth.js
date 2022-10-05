const express = require('express')
// const auth = require('basic-auth')
const jwt = require('jsonwebtoken')
const app = express()
require('dotenv').config()
app.use(express.json())

// Global Variable
    const jwtKey = process.env.JWT_KEY


// Middleware JWT
function auth (req,res,next){
    const header = req.header('Authorization')
    const jwtKey = process.env.JWT_KEY
    if(!header) return res.status(401).json({
        message: "Access Denied!"
    })
     
    try {
        const token = header.split(' ')[1]
        const verfication = jwt.verify(token,jwtKey)
        req.user = verfication
        next()
    } catch {
        res.status(400).json({
            message: "Invalid Token!"
        })
    }
        
}

module.exports = auth