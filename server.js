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
const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
