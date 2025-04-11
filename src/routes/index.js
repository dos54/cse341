// ==============================================
// Section: Imports
// ===============================================
const router = require('express').Router()
const passport = require('passport')
const lesson1Controller = require('../controllers/lesson1')

// ==============================================
// Section: Routes
// ===============================================
router.use('/', require('./swagger.js'))
router.use('/contacts', require('./contacts'))
router.use('/users', require('./users.js'))
router.use('/calculate', require('./calculate.js'))
router.use('/books', require('./books.js'))

router.get(
  '/login',
  passport.authenticate('github', () => {})
)

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

router.get('/', (req, res) => {
  res.send('<a href="/api-docs">Click here to see API docs</a>')
})
router.get('/professional', lesson1Controller.professionalRoute)

module.exports = router
