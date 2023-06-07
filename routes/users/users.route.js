// Import Packages
const express = require("express");
const userRoute = express.Router();
const userController = require("../../controllers/user.controller");

// Define Routes
userRoute.post("/markAttendence", userController.attendenceMarker);


// Export routes
module.exports = userRoute;
