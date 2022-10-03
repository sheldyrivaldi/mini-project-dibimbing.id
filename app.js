const express = require('express')
const app = express()
const merchantsList = require('./routes/merchants.js')
const productsList = require('./routes/products.js')
const login = require('./routes/login')
app.use(express.json())

app.use('/login', login)
app.use('/merchants', merchantsList)
app.use('/products', productsList)



app.listen(3000, function (){
    console.log('running on port 3000')
})