const express = require('express')
const router = express.Router()

const contactsController = require('../controllers/contactsController')

router.get('/', contactsController.getAll)
router.get('/:id', contactsController.getFirstContact)

router.post('/', contactsController.addNewContact)
router.put('/:id', contactsController.updateContactData)
router.delete('/:id', contactsController.deleteContact)

module.exports = router
