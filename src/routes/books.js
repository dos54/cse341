const express = require('express')
const router = express.Router()
const booksController = require('../controllers/booksController')
const reviewsController = require('../controllers/bookReviewsController')
const bookSchema = require('../schemas/bookSchema')
const reviewSchema = require('../schemas/reviewSchema')
const { validateJoiSchema } = require('../validation/validator')
const { isAuthenticated } = require('../middleware/authenticate')

// Book routes
router.get('/', booksController.getAllBooks)
router.post(
  '/',
  isAuthenticated,
  validateJoiSchema(bookSchema.bookSchema),
  booksController.addBook
)
router.post('/bulk', isAuthenticated, booksController.addMultipleBooks)
router.get('/:id', booksController.getBookById)
router.put(
  '/:id',
  isAuthenticated,
  validateJoiSchema(bookSchema.bookSchema),
  booksController.updateBookById
)
router.patch(
  '/:id',
  isAuthenticated,
  validateJoiSchema(bookSchema.bookUpdateSchema),
  booksController.updateBookById
)
router.delete('/:id', isAuthenticated, booksController.deleteBookById)

// Review routes scoped under books
router.get('/:id/reviews', reviewsController.getReviewsByBookId)
router.post(
  '/:id/reviews',
  isAuthenticated,
  validateJoiSchema(reviewSchema.reviewSchema),
  reviewsController.addReview
)

// General review routes
router.get('/reviews/all', reviewsController.getAllReviews)
router.get('/reviews/:id', reviewsController.getReviewById)
router.put(
  '/reviews/:id',
  isAuthenticated,
  validateJoiSchema(reviewSchema.reviewSchema),
  reviewsController.updateReviewById
)
router.patch(
  '/reviews/:id',
  isAuthenticated,
  validateJoiSchema(reviewSchema.reviewUpdateSchema),
  reviewsController.updateReviewById
)
router.delete(
  '/reviews/:id',
  isAuthenticated,
  reviewsController.deleteReviewById
)

module.exports = router
