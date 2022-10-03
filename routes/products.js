const express = require('express')
const db = require('../config/mysql')
const validation = require('../middlewares/productsValidation')
const router = express.Router()
router.use(express.json())
router.use('/', validation)

//Getting list of products
router.get('/', (req, res) => {
    let sql = `SELECT * FROM products;`
    db.query(sql, function (err, products) {
    if (err) throw err
    res.status(200).json(products)
    })
})

// Create an product
router.post('/', (req, res) => {
    let id = req.body.id
    let name = req.body.name // min 3 and max 50
    let quantity = req.body.quantity // min 1
    let price = req.body.price // min 10000
    let sql =  `INSERT INTO products (id, name, quantity, price)
                VALUES ("${id}", "${name}", ${quantity}, ${price});`
    db.query(sql, (err, products)=>{
        if(err) throw err
        res.status(200).json({message: "Product added successfully!"})
    })
})

// Update an product
router.put('/', (req, res) => {
    let id = req.body.id
    let name = req.body.name // min 3 and max 50
    let quantity = req.body.quantity // min 1
    let price = req.body.price // min 10000
    let sql =  `UPDATE products SET name = "${name}", quantity = ${quantity}, price = ${price}  where id = "${id}";`
    db.query(sql, (err, products) => {
        if(err) throw err
        res.status(200).json({message: "Product updated successfully!"})
    })
})

//Get product by id
router.get('/:id', (req, res) => {
    let id = req.params.id
    let sql = `SELECT * FROM products WHERE id="${id}";`
    db.query(sql, function (err, products) {
    if (err) throw err
    res.status(200).json(products)
    })
})

// Delete an product
router.delete('/:id', (req, res, next) => {
    let id = req.params.id
    let sql = `DELETE FROM products WHERE id = "${id}";`
    db.query(sql, (err, products)=>{
        if(err) throw err
        res.status(200).json({message: "Product deleted successfully!"})
    })
    
})




module.exports = router