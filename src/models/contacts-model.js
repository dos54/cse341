const { query, updateData, addData, deleteData } = require('../database')

/**
 * Retrieves all contacts from the database.
 * @async
 * @function getAllContacts
 * @returns {Promise<Array<Object>>} A list of all contacts.
 */
async function getAllContacts() {
  const data = await query('cse341', 'contacts')
  return data
}

/**
 * Retrieves the first contact that matches the provided filter.
 * @async
 * @function getFirstContact
 * @param {Object} [filter={}] - The filter criteria to find a contact.
 * @returns {Promise<Object|null>} The first matching contact, or null if none found.
 */
async function getFirstContact(filter = {}) {
  const data = await query('cse341', 'contacts', filter)
  return data.length > 0 ? data[0] : null
}

/**
 * Adds a new contact to the database.
 * @async
 * @function addContact
 * @param {Object} data - The contact data to be added.
 * @returns {Promise<string>} The ID of the newly created contact.
 */
async function addContact(data) {
  const newContactId = await addData('cse341', 'contacts', data)
  return newContactId
}

/**
 * Updates a contact that matches the provided filter.
 * @async
 * @function updateContactData
 * @param {Object} filter - The filter criteria to find the contact to update.
 * @param {Object} data - The updated contact data.
 * @returns {Promise<boolean>} `true` if the contact was updated, `false` otherwise.
 */
async function updateContactData(filter, data) {
  const success = await updateData('cse341', 'contacts', filter, data)
  return success
}

/**
 * Deletes a contact that matches the provided filter.
 * @async
 * @function deleteContactData
 * @param {Object} filter - The filter criteria to find the contact to delete.
 * @returns {Promise<boolean>} `true` if a contact was deleted, `false` otherwise.
 */
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
