const { query, updateData, addData, deleteData } = require('.')

/**
 *
 * @returns {list} A list of all contacts
 */
async function getAllContacts() {
  const data = await query('cse341', 'contacts')
  return data
}

/**
 *
 * @param {object} filter The filter to use
 * @returns
 */
async function getFirstContact(filter = {}) {
  const data = await query('cse341', 'contacts', filter)
  return data[0]
}

async function addContact(data) {
  const newContactId = await addData('cse341', 'contacts', data)
  return newContactId
}

async function updateContactData(filter, data) {
  const success = await updateData('cse341', 'contacts', filter, data)
  return success
}

async function deleteContactData(filter) {
  const success = await deleteData('cse341', 'contacts', filter)
  return success > 0
}

module.exports = {
  getAllContacts,
  getFirstContact,
  addContact,
  updateContactData,
  deleteContactData,
}
