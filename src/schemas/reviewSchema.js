const Joi = require('joi')

const reviewSchema = Joi.object({
  reviewerName: Joi.string().required().example('Jane Doe'),
  rating: Joi.number().min(0).max(5).required().example(4.5),
  comment: Joi.string()
    .required()
    .example('A beautifully written book with deep emotional resonance.'),
  createdAt: Joi.date().required().example('2025-03-22T00:00:00Z'),
})

const reviewUpdateSchema = Joi.object({
  reviewerName: Joi.string().example('Jane Doe'),
  rating: Joi.number().min(0).max(5).example(4.5),
  comment: Joi.string().example(
    'A beautifully written book with deep emotional resonance.'
  ),
  createdAt: Joi.date().example('2025-03-22T00:00:00Z'),
}).min(1)
module.exports = { reviewSchema, reviewUpdateSchema }
