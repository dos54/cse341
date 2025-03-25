const { query, updateData, addData, deleteData } = require('../database')

/**
 * Get a list of all books in the mongoDB database.
 * @returns A list of books
 */
async function getAllReviews() {
  const data = await query('cse341', 'reviews')
  return data
}

/**
 * Get a book from the database using its ObjectId
 * @param {ObjectId} id The id of a book. Must be a valid mongodb ObjectId
 * @returns The book object.
 */
async function getReviewById(id) {
  const review = await query('cse341', 'reviews', { _id: id })
  return review[0]
}

/**
 * Get a book from the database using its ObjectId
 * @param {ObjectId} bookId The id of a book. Must be a valid mongodb ObjectId
 * @returns The book object.
 */
async function getReviewsByBookId(bookId) {
  const reviews = await query('cse341', 'reviews', { bookId: bookId })
  return reviews
}

/**
 * Update a book's data given its ObjectId
 * @param {ObjectId} id The ObjectId of the deleted item
 * @param {Object} data The data to be updated
 * @returns {Boolean}
 */
async function updateReviewById(id, data) {
  const success = await updateData('cse341', 'reviews', { _id: id }, data)
  return success
}

async function addReview(data) {
  const newBookId = await addData('cse341', 'reviews', data)
  return newBookId
}

async function deleteReviewById(id) {
  const numberDeleted = await deleteData('cse341', 'reviews', { _id: id })
  return numberDeleted > 0
}

module.exports = {
  getAllReviews,
  getReviewsByBookId,
  getReviewById,
  updateReviewById,
  addReview,
  deleteReviewById,
}
