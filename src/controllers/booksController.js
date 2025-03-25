const booksModel = require('../models/books-model')
const ObjectId = require('mongodb').ObjectId

const getAllBooks = async (req, res) => {
  try {
    const books = await booksModel.getAllBooks()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(books)
  } catch {
    res.status(500).json({ error: 'Failed to fetch books' })
  }
}

const getBookById = async (req, res) => {
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

const addBook = async (req, res) => {
  try {
    const book = req.body
    const newBookId = await booksModel.addBook(book)
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ newBookId: newBookId })
  } catch {
    res.status(500).json({ error: 'Failed to add book' })
  }
}

const addMultipleBooks = async (req, res) => {
  try {
    const booksList = req.body
    const newBookIds = await booksModel.addMultipleBooks(booksList)
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ newBooksIds: newBookIds })
  } catch {
    res.status(500).json({ error: 'Failed to add books' })
  }
}

const updateBookById = async (req, res) => {
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

const deleteBookById = async (req, res) => {
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
