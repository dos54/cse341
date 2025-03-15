const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')

router.get('/', usersController.getAllUsers)
router.get('/:id', usersController.getUserById)
router.post('/', usersController.addUser)
router.delete('/:id', usersController.deleteUserById)

module.exports = router
