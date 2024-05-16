const express = require('express');
const paymentRouter = express.Router();
const paymentController = require('../controller/paymentController');

// create a new service
paymentRouter.post("/create", paymentController.createPayment);


module.exports = paymentRouter;
