const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
router.use(express.json())
router.use(auth)


router.post('/', (req, res)=>{
    res.status(200).json({
        message: "Login Successfully!"
    })
})

module.exports = router