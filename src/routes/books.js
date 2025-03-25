const express = require('express')
const router = express.Router()
const booksController = require('../controllers/booksController')
const reviewsController = require('../controllers/bookReviewsController')
const bookSchema = require('../schemas/bookSchema')
const reviewSchema = require('../schemas/reviewSchema')
const { validateJoiSchema } = require('../validation/validator')

// Book routes
router.get('/', booksController.getAllBooks)
router.post(
  '/',
  validateJoiSchema(bookSchema.bookSchema),
  booksController.addBook
)
router.post('/bulk', booksController.addMultipleBooks)
router.get('/:id', booksController.getBookById)
router.put(
  '/:id',
  validateJoiSchema(bookSchema.bookSchema),
  booksController.updateBookById
)
router.patch(
  '/:id',
  validateJoiSchema(bookSchema.bookUpdateSchema),
  booksController.updateBookById
)
router.delete('/:id', booksController.deleteBookById)

// Review routes scoped under books
router.get('/:id/reviews', reviewsController.getReviewsByBookId)
router.post(
  '/:id/reviews',
  validateJoiSchema(reviewSchema.reviewSchema),
  reviewsController.addReview
)

// General review routes
router.get('/reviews/all', reviewsController.getAllReviews)
router.get('/reviews/:id', reviewsController.getReviewById)
router.put(
  '/reviews/:id',
  validateJoiSchema(reviewSchema.reviewSchema),
  reviewsController.updateReviewById
)
router.patch(
  '/reviews/:id',
  validateJoiSchema(reviewSchema.reviewUpdateSchema),
  reviewsController.updateReviewById
)
router.delete('/reviews/:id', reviewsController.deleteReviewById)

module.exports = router
