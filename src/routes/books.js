const express = require('express')
const router = express.Router()
const booksController = require('../controllers/booksController')
const reviewsController = require('../controllers/bookReviewsController')

// Book routes
router.get('/', booksController.getAllBooks)
router.post('/', booksController.addBook)
router.post('/bulk', booksController.addMultipleBooks)
router.get('/:id', booksController.getBookById)
router.put('/:id', booksController.updateBookById)
router.delete('/:id', booksController.deleteBookById)

// Review routes scoped under books
router.get('/:id/reviews', reviewsController.getReviewsByBookId)
router.post('/:id/reviews', reviewsController.addReview)

// General review routes (if needed)
router.get('/reviews/all', reviewsController.getAllReviews)
router.get('/reviews/:id', reviewsController.getReviewById)
router.put('/reviews/:id', reviewsController.updateReviewById)
router.delete('/reviews/:id', reviewsController.deleteReviewById)

module.exports = router
