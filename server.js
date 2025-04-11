/*===============================================
File: server.js
Author: Steven Thomas
Date: March 10, 2025
Purpose: Server script
===============================================*/

// Express Web Server

// ==============================================
// Section: Imports
// ===============================================
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy
require('dotenv').config()

app
  .use(
    cors({
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'OPTIONS', 'DELETE'],
    })
  )
  .use(
    cors({
      origin: '*',
    })
  )

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile)
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : `Logged out`
  )
})

app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user
    res.redirect('/')
  }
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  next()
})

app.use(express.static('public'))
app.use('/', require('./src/routes/index.js'))

app.listen(port)
console.log(`Web server listening on port ${port}`)
