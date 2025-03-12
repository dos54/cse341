const routes = require("express").Router();
const lesson1Controller = require("../controllers/lesson1");

routes.get("/", lesson1Controller.homeRoute);
routes.get("/professional", lesson1Controller.professionalRoute)

module.exports = routes;
