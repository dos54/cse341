const {
  query,
  updateData,
  addData,
  deleteData,
  addMultipleData,
} = require('../database')

/**
 * Get a list of all books in the mongoDB database.
 * @returns A list of books
 */
async function getAllBooks() {
  const data = await query('cse341', 'books')
  return data
}

/**
 * Get a book from the database using its ObjectId
 * @param {ObjectId} id The id of a book. Must be a valid mongodb ObjectId
 * @returns The book object.
 */
async function getBookById(id) {
  const book = await query('cse341', 'books', { _id: id })
  return book[0]
}

/**
 * Update a book's data given its ObjectId
 * @param {ObjectId} id The ObjectId of the deleted item
 * @param {Object} data The data to be updated
 * @returns {Boolean}
 */
async function updateBookById(id, data) {
  const success = await updateData('cse341', 'books', { _id: id }, data)
  return success
}

async function addBook(data) {
  const newBookId = await addData('cse341', 'books', data)
  return newBookId
}

async function addMultipleBooks(booksList) {
  const newBookIds = await addMultipleData('cse341', 'books', booksList)
  return Object.values(newBookIds)
}

async function deleteBookById(id) {
  const numberDeleted = await deleteData('cse341', 'books', { _id: id })
  return numberDeleted > 0
}

module.exports = {
  getAllBooks,
  getBookById,
  updateBookById,
  addBook,
  addMultipleBooks,
  deleteBookById,
}
