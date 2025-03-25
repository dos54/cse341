const Joi = require('joi')

const bookSchema = Joi.object({
  title: Joi.string().required().example('The Great Gatsby'),
  author: Joi.string().required().example('F. Scott Fitzgerald'),
  genre: Joi.string().required().example('Fiction'),
  publishedDate: Joi.date().required().example('1925-04-10'),
  summary: Joi.string()
    .required()
    .example(
      'A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.'
    ),
  isbn: Joi.string().required().example('9780743273565'),
  averageRating: Joi.number().min(0).max(5).required().example(4.3),
})

const bookUpdateSchema = Joi.object({
  title: Joi.string().example('The Great Gatsby'),
  author: Joi.string().example('F. Scott Fitzgerald'),
  genre: Joi.string().example('Fiction'),
  publishedDate: Joi.date().example('1925-04-10'),
  summary: Joi.string().example(
    'A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.'
  ),
  isbn: Joi.string().example('9780743273565'),
  averageRating: Joi.number().min(0).max(5).example(4.3),
})

module.exports = { bookSchema, bookUpdateSchema }
