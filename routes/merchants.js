const express = require('express')
const db = require('../config/mysql')
const validation = require('../middlewares/merchantsValidation')
const router = express.Router()
router.use(express.json())
router.use('/',validation)


//Getting list of merchants
router.get('/', (req, res) => {
    let sql = `SELECT * FROM merchants;`
    db.query(sql, function (err, merchants) {
        if (err) throw err
        res.status(200).json(merchants)
    })
})

// Register or Create an Merchant
router.post('/', (req, res) => {
    let id = req.body.id
    let password = req.body.password //min 6
    let name = req.body.name // min 3 and max 50
    let address = req.body.address
    let join_date = req.body.join_date // Date format : YYYY-MM-DD
    let phone_number = req.body.phone_number // Don't start from zero, ex: 82134536212
    let sql =  `INSERT INTO merchants (id, password, name, address, join_date, phone_number) VALUES ("${id}", "${password}", "${name}", "${address}", "${join_date}", ${phone_number});`
    
        db.query(sql, (err, merchants)=>{
        if(err) throw err
        res.status(200).json({
            message: "Merchant added successfully!"
            })
        })
    
})

//Get merchant by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    let sql = `SELECT * FROM merchants where id="${id}";`
    db.query(sql, function (err, merchants) {
        if (err) throw err
            res.status(200).json(merchants)
    })
})

// Delete an merchant
router.delete('/:id', (req, res) => {
    const id = req.params.id
    let sqlDelete = `DELETE FROM merchants WHERE id = "${id}";`
    db.query(sqlDelete, (err, merchants)=>{
        if(err) throw err
        res.status(200).json({
        message: "Merchant deleted successfully!"
        })
    })
})





module.exports = router