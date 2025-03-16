const contactsModel = require('../models/contacts-model')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
  await contactsModel.getAllContacts().then((contacts) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(contacts)
  })
}

const getFirstContact = async (req, res) => {
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

const addNewContact = async (req, res) => {
  await contactsModel.addContact(req.body).then((contactId) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ newContactId: contactId })
  })
}

const updateContactData = async (req, res) => {
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

const deleteContact = async (req, res) => {
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
