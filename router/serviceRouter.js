const express = require('express');
const serviceRouter = express.Router();
const serviceController = require('../controller/serviceController');

// create a new service
serviceRouter.post("/create", serviceController.createService);

// get all services
serviceRouter.get("/", serviceController.getAllServices);

// get all services that matched with a pattern
serviceRouter.get("/find/:email", serviceController.getManagerService);

// get all services that matched with a pattern
serviceRouter.get("/request/:email", serviceController.getUserService);

// change status of a service based on the id
serviceRouter.patch("/edit/:id", serviceController.changeStatus);

// get the total number of services of a category
serviceRouter.get("/service-count/:id", serviceController.countServiceOfCategory);

module.exports = serviceRouter;
