const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
router.use(express.json())
require('dotenv').config()

router.post('/', (req, res)=>{
    if(req.body.username == undefined || req.body.password == undefined){
        res.status(400).json({
            message: "Invalid Usename or Password!"
            })
    }else if(req.body.username != process.env.USERNAME_LOGIN || req.body.password != process.env.PASSWORD_LOGIN){
        res.status(400).json({
            message: "Wrong Usename or Password!" 
            })
    } else {
        const user = req.body.username
        const jwtKey = process.env.JWT_KEY
        const token  = jwt.sign({username: user}, jwtKey)
        res.header('Authorization', "Bearer " + token).status(200).json({
            message: "Login Successfully!"
        })
    }
})


module.exports = router