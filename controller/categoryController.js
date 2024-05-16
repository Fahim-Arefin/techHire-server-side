const Category = require('../model/category');
const User = require('../model/user');

const createCategory  = async (req, res) => {
    try {
        // Extract data from request body
        const { area, category, entryFee, phoneNumber,managerEmail,managerName } = req.body;
    
        // Create a new category instance
        const newCategory = new Category({
          area,
          category,
          entryFee,
          phoneNumber,
          managerEmail,
          managerName
        });
    
        // Save the category to the database
        const savedCategory = await newCategory.save();
    
        // Send the saved category in the response
        res.status(201).json(savedCategory);
      } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const updateCategory = async (req, res) => {
  try {
      const { area, category, entryFee, phoneNumber, managerEmail, managerName } = req.body;
      const { id } = req.params;

      // Assuming you have a Category model and findByIdAndUpdate method
      const updatedCategory = await Category.findByIdAndUpdate(id, {
          area,
          category,
          entryFee,
          phoneNumber,
          managerEmail,
          managerName
      }, { new: true });

      if (!updatedCategory) {
          return res.status(404).json({ error: 'Category not found' });
      }

      res.status(200).json(updatedCategory);
  } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const data = await Category.find({});
    res.send(data);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const getMyCategories = async (req, res) => {
  try {
    const email = req.params.email;
    const data = await Category.find({managerEmail: email});
    res.send(data);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const getACategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findById(id);
    res.send(data);
  } catch (error) {
    console.error('Error getting category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findByIdAndDelete(id);
    res.send(data);
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {createCategory,getAllCategories,getMyCategories,deleteCategory, getACategory,updateCategory}