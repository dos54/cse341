const { body, validationResult } = require('express-validator')

const userValidationRules = () => {
  return [body('username').isEmail(), body('password').isLength({ min: 5 })]
}

const contactsValidationRules = () => {
  console.log('🚀 contactsValidationRules() is running') // ✅ Debug log

  return [
    body('firstName'),

    body('lastName'),

    body('email').isEmail().withMessage('Invalid email address.'),

    body('favoriteColor'),

    body('birthday')
      .isISO8601()
      .withMessage('Invadid date format (expected YYYY-MM-DD)')
      .custom((value) => {
        const inputDate = new Date(value)
        const today = new Date()

        if (inputDate > today) {
          throw new Error('Date must not be in the future')
        }
        return true
      }),
  ]
}

const validate = (req, res, next) => {
  console.log('Validating request body', req.body)
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  console.log('Validation errors', errors.array())
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  contactsValidationRules,
  validate,
}
