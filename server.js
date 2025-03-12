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
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectToDatabase = require("./src/database/connection.js");
const cors = require("cors")

app.use(cors())
app.use(express.static("public"))
app.use("/", require("./src/routes/index.js"));

app.listen(port);
console.log(`Web server listening on port ${port}`);
