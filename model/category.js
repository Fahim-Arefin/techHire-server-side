const mongoose = require("mongoose");

const categoySchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  entryFee: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  managerEmail: {
    type: String,
    required: true,
  },
  managerName: {
    type: String,
    required: true,
  },
  serviceGiven:{
    type: Number,
    default:0,
  }
});

const Category = mongoose.model("Category", categoySchema);

module.exports = Category;
