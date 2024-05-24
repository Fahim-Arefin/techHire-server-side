const Review = require("../model/review");


// create a new service
const createReview  = async (req, res) => {
    try {
        // Extract data from request body
        const body = req.body;
    
        // Create a new category instance
        const newReview = new Review(body)
    
        // Save the category to the database
        const savedReview = await newReview.save();
    
        // Send the saved category in the response
        res.status(201).json(savedReview);
      } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const getReviewsBasedOnCategoryId = async (req, res) => {
    // get all reviews of a category 
    try {
        const categoryId = req.params.id;
        const data = await Review.find({categoryId}).populate("categoryId");
        res.send(data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }

module.exports = {createReview,getReviewsBasedOnCategoryId}