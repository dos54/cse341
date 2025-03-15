const { getAllContacts, getFirstContact } = require('../models/contacts-model')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
  await getAllContacts().then((contacts) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(contacts)
  })
}

const getFirst = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  const userId = new ObjectId(req.params.id)
  await getFirstContact({ _id: userId }).then((contact) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(contact)
  })
}

module.exports = {
  getAll,
  getFirst,
}
