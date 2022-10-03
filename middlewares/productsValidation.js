const express = require('express')
const app = express()
const db = require('../config/mysql')
const auth = require('./auth')
app.use(express.json())
app.use(auth)

// Global variable
const parameter = ['id', 'name', 'quantity', 'price']

// Global Function
function validationKeys(keys, params){
    let result = keys.includes(params[0])
    for (let i = 1; i < params.length; i++){
        result = result && keys.includes(params[i])
    }
    return result
}


// Validation route /products/:id
app.use('/:id', (req, res, next) => {
    const id = req.params.id
    let sql = `SELECT * FROM products where id="${id}";`
    if (id.length < 1 || id.length > 255) {
        return res.status(400).json({
            message: "Minimum character is 1 and maximum 255."
        })
    }
    
    db.query(sql, function (err, products) {
        if (err) throw err
        if (products.length <= 0) {
            return res.status(404).json({message: "No product found!"})
        }
        else {
            next()
        }
    })
})
    
// Validation route /products
app.post('/',  (req, res, next) =>{
    let id = req.body.id
    let name = req.body.name    
    let quantity = req.body.quantity
    let price = req.body.price
    let arrayOfKeys = Object.keys(req.body)
    let sql = `SELECT * FROM products where id="${id}";`

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
            message: "Minimum character is 1 and maximum 255."
        })
    }
    if (isNaN(quantity) == true || quantity == undefined){
        return res.status(400).json({
            message: "Please input quantity as numeric!"
        })
    }
    if (isNaN(price) == true || price == undefined){
        return res.status(400).json({
            message: "Please input price as numeric!"
        })
    }
    if (name.length < 3 || name.length > 50 || name == undefined){
        return res.status(400).json({
            message: "Input invalid! Minimum 6 characters and maximum 50 characters."
        })
    }
    if (quantity < 1){
        return res.status(400).json({
            message: "Input invalid! The minimum quantity is 1."
        })
    }
    if (price < 10000){
        return res.status(400).json({
            message: "Input invalid! The minimum price is 10000."
        })
    } 
    db.query(sql, function (err, accounts) {
        if (err) throw err
        if (accounts.length > 0) {
            return res.status(409).json({message: "Product id duplicate!"})
        }
        else {
            next()
        }
    })
})

app.put('/',  (req, res, next) =>{
    let id = req.body.id
    let name = req.body.name    
    let quantity = req.body.quantity
    let price = req.body.price
    let arrayOfKeys = Object.keys(req.body)
    let sql = `SELECT * FROM products where id="${id}";`

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
            message: "Minimum character is 1 and maximum 255."
        })
    }
    if (isNaN(quantity) == true || quantity == undefined){
        return res.status(400).json({
            message: "Please input quantity as numeric!"
        })
    }
    if (isNaN(price) == true || price == undefined){
        return res.status(400).json({
            message: "Please input price as numeric!"
        })
    }
    
    if (name.length < 3 || name.length > 50 || name == undefined){
        return res.status(400).json({
            message: "Input invalid! Minimum 6 characters and maximum 50 characters."
        })
    }
    if (quantity <= 0){
        return res.status(400).json({
            message: "The minimum quantity is 1. Do you want to remove this product?"
        })
    }
    if (price < 10000){
        return res.status(400).json({
            message: "Input invalid! The minimum price is 10000."
        })
    } db.query(sql, function (err, products) {
        if (err) throw err
        if (products.length <= 0) {
            return res.status(404).json({message: "No product found!"})
        }
        else {
            next()
        }
    })
})


module.exports = app