const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controller/categoryController');

// get all categories
categoryRouter.get("/", categoryController.getAllCategories);

// get all categories
categoryRouter.get("/:email", categoryController.getMyCategories);

// get all categories
categoryRouter.get("/find/:id", categoryController.getACategory);

// Create a category
categoryRouter.post("/", categoryController.createCategory);

// Create a category
categoryRouter.patch("/:id", categoryController.updateCategory);

// Create a category
categoryRouter.delete("/:id", categoryController.deleteCategory);


module.exports = categoryRouter;
