const { ObjectId } = require('mongodb')
const reviewsModel = require('../models/book-reviews-model')
const booksModel = require('../models/books-model')

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewsModel.getAllReviews()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(reviews)
  } catch {
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
}

const getReviewsByBookId = async (req, res) => {
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

const getReviewById = async (req, res) => {
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

const addReview = async (req, res) => {
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
    res.status(201).json({ newReviewId: newReviewId })
  } catch {
    res.status(500).json({ error: 'Failed to add review' })
  }
}

const updateReviewById = async (req, res) => {
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

const deleteReviewById = async (req, res) => {
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
