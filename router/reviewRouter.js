const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controller/reviewController');


// create a new review
reviewRouter.post("/create", reviewController.createReview);

// get all reviews of a category
reviewRouter.get("/:id", reviewController.getReviewsBasedOnCategoryId);



module.exports = reviewRouter;
