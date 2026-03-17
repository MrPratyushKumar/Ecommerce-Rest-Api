const express = require('express');
const router = express.Router();

const{getAllCategories , getSingleCategoryByID , updateCategory , deleteCategory , createNewCategory} = require('../controllers/category-Controller.js');


//  Create all the routes that are related to Categories only 

// get all the Categories
router.get('/get', getAllCategories);

// get single Category from  by id -> dynamic route
router.get('/get/:id' , getSingleCategoryByID);

// create new category
router.post('/add' , createNewCategory);

// Update the Category based on Id 
router.put('/update/:id' , updateCategory);

// delete the category based on Id
router.delete('/delete/:id' , deleteCategory);

// Export all the Categories 
module.exports = router;