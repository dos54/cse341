const { query } = require('.')

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

module.exports = {
  getAllContacts,
  getFirstContact,
}
