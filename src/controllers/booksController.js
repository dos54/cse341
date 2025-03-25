const booksModel = require('../models/books-model')
const ObjectId = require('mongodb').ObjectId

/**
 * Get all books
 * @route GET /books
 * @returns {Book[]} 200 - An array of book objects
 */
const getAllBooks = async (req, res) => {
  /* #swagger.tags = ['Books']
     #swagger.summary = 'Get all books'
     #swagger.responses[200] = {
       description: 'List of books',
       schema: [{ $ref: '#/definitions/Book' }]
     }
  */
  try {
    const books = await booksModel.getAllBooks()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(books)
  } catch {
    res.status(500).json({ error: 'Failed to fetch books' })
  }
}

/**
 * Get a book by its ID
 * @route GET /books/{id}
 * @param {string} id.path.required - Book ID
 * @returns {Book} 200 - A single book object
 */
const getBookById = async (req, res) => {
  /* #swagger.tags = ['Books']
     #swagger.summary = 'Get a book by ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.responses[200] = {
       description: 'Book found',
       schema: { $ref: '#/definitions/Book' }
     }
  */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  const bookId = new ObjectId(req.params.id)
  try {
    const book = await booksModel.getBookById(bookId)
    res.setHeader('Content-Type', 'application/json')
    if (book) {
      res.status(200).json(book)
    } else {
      res
        .status(404)
        .json({ error: `Could not find a book with the id ${req.params.id}` })
    }
  } catch {
    res
      .status(500)
      .json({ error: `Failed to fetch book with id ${req.params.id}` })
  }
}

/**
 * Add a single book
 * @route POST /books
 * @param {Book.model} body.body.required - Book object
 * @returns {string} 201 - New book ID
 */
const addBook = async (req, res) => {
  /* #swagger.tags = ['Books']
     #swagger.summary = 'Add a new book'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/Book' }
     }
  */
  try {
    const book = req.body
    const newBookId = await booksModel.addBook(book)
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ newBookId })
  } catch {
    res.status(500).json({ error: 'Failed to add book' })
  }
}

/**
 * Add multiple books
 * @route POST /books/bulk
 * @param {Book[]} body.body.required - Array of book objects
 * @returns {string[]} 201 - Array of new book IDs
 */
const addMultipleBooks = async (req, res) => {
  /* #swagger.tags = ['Books']
     #swagger.summary = 'Add multiple books'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: [{ $ref: '#/definitions/Book' }]
     }
  */
  try {
    const booksList = req.body
    const newBookIds = await booksModel.addMultipleBooks(booksList)
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ newBooksIds: newBookIds })
  } catch {
    res.status(500).json({ error: 'Failed to add books' })
  }
}

/**
 * Update a book by ID
 * @route PUT /books/{id}
 * @param {string} id.path.required - Book ID
 * @param {Book.model} body.body.required - Updated book object
 * @returns {void} 204 - Book updated
 */
const updateBookById = async (req, res) => {
  /* #swagger.tags = ['Books']
     #swagger.summary = 'Update a book by ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/Book' }
     }
  */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  const bookId = new ObjectId(req.params.id)
  try {
    const success = await booksModel.updateBookById(bookId, req.body)
    res.setHeader('Content-Type', 'application/json')
    if (success) {
      return res.status(204).end()
    } else {
      res
        .status(404)
        .json({ error: `Could not find a book with the id ${req.params.id}` })
    }
  } catch {
    res
      .status(500)
      .json({ error: `Failed to update book with ID ${req.params.id}` })
  }
}

/**
 * Delete a book by ID
 * @route DELETE /books/{id}
 * @param {string} id.path.required - Book ID
 * @returns {void} 204 - Book deleted
 */
const deleteBookById = async (req, res) => {
  /* #swagger.tags = ['Books']
     #swagger.summary = 'Delete a book by ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  const bookId = new ObjectId(req.params.id)
  try {
    const success = await booksModel.deleteBookById(bookId)
    if (success) {
      return res.status(204).end()
    } else {
      res
        .status(404)
        .json({ error: `Could not find a book with the id ${req.params.id}` })
    }
  } catch {
    res
      .status(500)
      .json({ error: `Failed to delete book with ID ${req.params.id}` })
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  addMultipleBooks,
  updateBookById,
  addBook,
  deleteBookById,
}
