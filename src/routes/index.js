const routes = require("express").Router();
const lesson1Controller = require("../controllers/lesson1");

routes.get("/", lesson1Controller.homeRoute);
routes.get("/professional", lesson1Controller.professionalRoute)

routes.use('/contacts', require('./contacts'))

module.exports = routes;
