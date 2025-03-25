const express = require('express')
const calculateController = require('../controllers/calculateController')

const router = express.Router()

router.get('/', calculateController.calculateResult)

module.exports = router
