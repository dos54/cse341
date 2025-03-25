const express = require('express')
const router = express.Router()
const { validate, contactsValidationRules } = require('../validation/validator')

const contactsController = require('../controllers/contactsController')

router.get('/', contactsController.getAll)
router.get('/:id', contactsController.getFirstContact)

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Add a new contact
 *     tags:
 *       - Contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Joseph"
 *               lastName:
 *                 type: string
 *                 example: "Smith"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "josephsmith@byui.edu"
 *               favoriteColor:
 *                 type: string
 *                 example: "Blue"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1805-12-23"
 *     responses:
 *       200:
 *         description: Contact added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact created successfully"
 */
router.post(
  '/',
  contactsValidationRules(),
  validate,
  contactsController.addNewContact
)

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update an existing contact
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Joseph
 *               lastName:
 *                 type: string
 *                 example: Smith
 *               email:
 *                 type: string
 *                 format: email
 *                 example: josephsmith@byui.edu
 *               favoriteColor:
 *                 type: string
 *                 example: Blue
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1805-12-23"
 *     responses:
 *       204:
 *         description: Contact updated successfully.
 *       400:
 *         description: Invalid request.
 *       404:
 *         description: Contact not found.
 */
router.put('/:id', contactsController.updateContactData)

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to delete
 *     responses:
 *       204:
 *         description: Contact deleted successfully.
 *       404:
 *         description: Contact not found.
 */
router.delete('/:id', contactsController.deleteContact)

module.exports = router
