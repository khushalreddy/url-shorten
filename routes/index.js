const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.send('Hello World - 500')
})
module.exports = router;