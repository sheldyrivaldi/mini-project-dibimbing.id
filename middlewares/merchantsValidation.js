const express = require('express')
const app = express()
const db = require('../config/mysql')
app.use(express.json())


// Global variable
const parameter = ['id', 'password', 'name', 'join_date', 'address', 'phone_number']

// Global Function
function validationKeys(keys, params){
    let result = keys.includes(params[0])
    for (let i = 1; i < params.length; i++){
        result = result && keys.includes(params[i])
    }
    return result
}


// Validation route /merchants/:id
app.use('/:id', (req, res, next) => {
    const id = req.params.id
    let sql = `SELECT * FROM merchants where id="${id}";`
    if (id.length < 1 || id.length > 255) {
        return res.status(400).json({
            message: "Minimum character is 0 and maximum 255."
        })
    }
    
    db.query(sql, function (err, merchants) {
        if (err) throw err
        if (merchants.length <= 0) {
            return res.status(404).json({message: "No merchants found!"})
        }
        else {
            next()
        }
    })
})
    
// Validation route method /merchants according requirements
app.post('/', (req, res, next) =>{
    let id = req.body.id
    let password = req.body.password
    let name = req.body.name
    let join_date = req.body.join_date
    let address = req.body.address
    let phone_number = req.body.phone_number
    let arrayOfKeys = Object.keys(req.body)
    let regex = new RegExp(/^\d{2}\-\d{2}\-\d{4}$/)
    let sql = `SELECT * FROM merchants where id="${id}";`

    if (arrayOfKeys.length < 1){
        return res.status(400).json({
            message: "The input entered is empty!"
        })
    }
    if(validationKeys(arrayOfKeys, parameter) == false){
        return res.status(400).json({
            message: "Input format invalid! Please input according format JSON with correct parameter."
        })
    }
    if (id.length < 1 || id.length > 255 || id == undefined) {
        return res.status(400).json({
            message: "Minimum character is 0 and maximum 255."
        })
    }
    if (isNaN(phone_number) == true || phone_number == undefined){
        return res.status(400).json({
            message: "Please input phone number as numeric!"
        })
    }
    if (phone_number < 1){
        return res.status(400).json({
            message: "Please input a positive number as a phone number."
        })
    }
    if (password.length < 6 || password.length > 50 || password == undefined){
        return res.status(400).json({
            message: "Input invalid! Password minimum 6 and maximum 50 characters."
        })
    }
    if (name.length < 3 || name.length > 50 || name == undefined){
        return res.status(400).json({
            message: "Input invalid! Minimum 6 characters and maximum 50 characters."
        })
    }
    if (regex.test(join_date) == true || join_date == undefined){
        return res.status(400).json({
            message: "Input invalid! Please input according to the format YYYY-MM-DD or YYYY/MM/DD."
        })
    }
    if (address.length > 255 || address == undefined){
        return res.status(400).json({
            message: "Input invalid! Address maximum 50 characters."
        })
    }
    if (phone_number[0] == 0){
        return res.status(400).json({
            message: "Input invalid!.First number cannot be 0"
        })
    }
    
    db.query(sql, function (err, merchants) {
        if (err) throw err
        if (merchants.length > 0) {
            return res.status(409).json({message: "merchants id is duplicate!"})
        }
        else {
            next()
        }
    })
})


module.exports = app