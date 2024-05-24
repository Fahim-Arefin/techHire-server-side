const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userPhoto: {
    type: String,
    required: true
  },
    createdAt: {
    type: Date, 
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  },

});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
