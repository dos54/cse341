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
import express from "express";
const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(port)
console.log(`Web server listening on port ${port}`)