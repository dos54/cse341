// ==============================================
// Section: Imports
// ===============================================
const router = require('express').Router()
const lesson1Controller = require('../controllers/lesson1')

// ==============================================
// Section: Routes
// ===============================================
router.use('/', require('./swagger.js'))
router.use('/contacts', require('./contacts'))
router.use('/users', require('./users.js'))

router.get('/', (req, res) => {
  res.send('<a href="/api-docs">Click here to see API docs</a>')
})
router.get('/professional', lesson1Controller.professionalRoute)

module.exports = router
