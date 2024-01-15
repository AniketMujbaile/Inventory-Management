const express = require('express')
const router = express.Router()

router.use('/', require('./item'))

module.exports = router