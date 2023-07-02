const router = require('express').Router();

// Variables for each route

const homeroutes = require("./homeroutes.js")
const userRoutes = require ("./api/userRoutes.js")
const contactpage = require("./api/contactpage.js")
const eventRoutes = require("./api/eventRoutes.js")

// Created paths for the application's routes.  

router.use("/" , homeroutes);

router.use("/userRoutes", userRoutes);

router.use("/contactpage", contactpage);

router.use("/eventRoutes", eventRoutes);

module.exports = router;
 