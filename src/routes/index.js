// ==============================================
// Section: Imports
// ===============================================
const routes = require("express").Router();
const lesson1Controller = require("../controllers/lesson1");

// ==============================================
// Section: Routes
// ===============================================
routes.get("/", lesson1Controller.homeRoute);
routes.get("/professional", lesson1Controller.professionalRoute);

routes.use("/contacts", require("./contacts"));
routes.use("/users", require("./users.js"));

module.exports = routes;
