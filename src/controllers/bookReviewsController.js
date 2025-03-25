const { ObjectId } = require('mongodb')
const reviewsModel = require('../models/book-reviews-model')
const booksModel = require('../models/books-model')

/**
 * Get all reviews
 * @route GET /books/reviews/all
 * @returns {Review[]} 200 - List of all reviews
 */
const getAllReviews = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Get all reviews'
     #swagger.responses[200] = {
       description: 'List of all reviews',
       schema: [{ $ref: '#/definitions/Review' }]
     }
  */
  try {
    const reviews = await reviewsModel.getAllReviews()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(reviews)
  } catch {
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
}

/**
 * Get all reviews for a specific book
 * @route GET /books/{id}/reviews
 * @param {string} id.path.required - Book ID
 * @returns {Review[]} 200 - List of reviews for the book
 */
const getReviewsByBookId = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Get all reviews for a specific book'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.responses[200] = {
       description: 'Reviews for the specified book',
       schema: [{ $ref: '#/definitions/Review' }]
     }
  */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID Format' })
  }
  const bookId = new ObjectId(req.params.id)
  try {
    const reviews = await reviewsModel.getReviewsByBookId(bookId)
    res.setHeader('Content-Type', 'application/json')
    if (reviews) {
      res.status(200).json(reviews)
    } else {
      res
        .status(404)
        .json({ error: `Could not find a book with the id ${req.params.id}` })
    }
  } catch {
    res.status(500).json({
      error: `Failed to fetch reviews for book with id ${req.params.id}`,
    })
  }
}

/**
 * Get a single review by ID
 * @route GET /books/reviews/{id}
 * @param {string} id.path.required - Review ID
 * @returns {Review} 200 - Single review
 */
const getReviewById = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Get a review by ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.responses[200] = {
       description: 'Single review data',
       schema: { $ref: '#/definitions/Review' }
     }
  */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  const reviewId = new ObjectId(req.params.id)
  try {
    const review = await reviewsModel.getReviewById(reviewId)
    res.setHeader('Content-Type', 'application/json')
    if (review) {
      res.status(200).json(review)
    } else {
      res
        .status(404)
        .json({ error: `Could not find a review with the id ${req.params.id}` })
    }
  } catch {
    res
      .status(500)
      .json({ error: `Failed to fetch review with id ${req.params.id}` })
  }
}

/**
 * Add a review for a specific book
 * @route POST /books/{id}/reviews
 * @param {string} id.path.required - Book ID
 * @param {Review.model} body.body.required - Review data
 * @returns {string} 201 - New review ID
 */
const addReview = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Add a review to a book'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/Review' }
     }
  */
  const bookIdParam = req.params.id

  if (!ObjectId.isValid(bookIdParam)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  const bookId = new ObjectId(bookIdParam)
  try {
    const book = await booksModel.getBookById(bookId)
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }

    const review = {
      ...req.body,
      bookId: bookId,
    }
    const newReviewId = await reviewsModel.addReview(review)
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ newReviewId })
  } catch {
    res.status(500).json({ error: 'Failed to add review' })
  }
}

/**
 * Update a review by ID
 * @route PUT /books/reviews/{id}
 * @param {string} id.path.required - Review ID
 * @param {Review.model} body.body.required - Updated review data
 * @returns {void} 204 - Review updated
 */
const updateReviewById = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Update a review by ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/Review' }
     }
  */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  const reviewId = new ObjectId(req.params.id)
  const updateData = req.body
  try {
    const success = await reviewsModel.updateReviewById(reviewId, updateData)
    res.setHeader('Content-Type', 'application/json')
    if (success) {
      return res.status(204).end()
    } else {
      res
        .status(404)
        .json({ error: `Could not find a review with the id ${req.params.id}` })
    }
  } catch {
    res
      .status(500)
      .json({ error: `Failed to update review with ID ${req.params.id}` })
  }
}

/**
 * Delete a review by ID
 * @route DELETE /books/reviews/{id}
 * @param {string} id.path.required - Review ID
 * @returns {void} 204 - Review deleted
 */
const deleteReviewById = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Delete a review by ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  const reviewId = new ObjectId(req.params.id)
  try {
    const success = await reviewsModel.deleteReviewById(reviewId)
    if (success) {
      return res.status(204).end()
    } else {
      res
        .status(404)
        .json({ error: `Could not find a review with the id ${req.params.id}` })
    }
  } catch {
    res
      .status(500)
      .json({ error: `Failed to delete review with ID ${req.params.id}` })
  }
}

module.exports = {
  getAllReviews,
  getReviewById,
  getReviewsByBookId,
  addReview,
  updateReviewById,
  deleteReviewById,
}
