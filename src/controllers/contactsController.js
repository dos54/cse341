const contactsModel = require('../models/contacts-model')
const ObjectId = require('mongodb').ObjectId

/**
 * Retrieves all contacts from the database.
 * @async
 * @function getAll
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with all contacts.
 */
const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']

  await contactsModel.getAllContacts().then((contacts) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(contacts)
  })
}

/**
 * Retrieves a single contact by ID.
 * @async
 * @function getFirstContact
 * @param {import('express').Request} req - Express request object, contains the contact ID in params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the contact data or an error message.
 */
const getFirstContact = async (req, res) => {
  //#swagger.tags=['Contacts']

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  const contactId = new ObjectId(req.params.id)
  await contactsModel.getFirstContact({ _id: contactId }).then((contact) => {
    if (contact && Object.keys(contact).length > 0) {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(contact)
    } else {
      res.status(404).json({ error: 'Contact not found' })
    }
  })
}

/**
 * Adds a new contact to the database.
 * @async
 * @function addNewContact
 * @param {import('express').Request} req - Express request object, contains new contact data in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the new contact's ID.
 */
const addNewContact = async (req, res) => {
  //#swagger.tags=['Contacts']

  await contactsModel.addContact(req.body).then((contactId) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ newContactId: contactId })
  })
}

/**
 * Updates an existing contact by ID.
 * @async
 * @function updateContactData
 * @param {import('express').Request} req - Express request object, contains updated contact data in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a 204 status if successful, 404 if not found.
 */
const updateContactData = async (req, res) => {
  //#swagger.tags=['Contacts']

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  const contactId = new ObjectId(req.params.id)
  await contactsModel
    .updateContactData({ _id: contactId }, req.body)
    .then((updated) => {
      if (updated) {
        res.status(204).end()
      } else {
        res.status(404).json({ error: 'Contact not found' })
      }
    })
}

/**
 * Deletes a contact by ID.
 * @async
 * @function deleteContact
 * @param {import('express').Request} req - Express request object, contains contact ID in params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a 204 status if successful, 404 if not found.
 */
const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  const contactId = new ObjectId(req.params.id)
  await contactsModel.deleteContactData({ _id: contactId }).then((deleted) => {
    if (deleted) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Contact not found' })
    }
  })
}

module.exports = {
  getAll,
  getFirstContact,
  addNewContact,
  updateContactData,
  deleteContact,
}
