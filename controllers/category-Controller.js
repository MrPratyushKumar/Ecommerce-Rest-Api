const Category = require("../models/Category.js");

// ==================================================
// 1. GET ALL CATEGORIES
// ==================================================
const getAllCategories = async (req, res) => {
  try {
    const allActiveCategories = await Category.find({ isActive: true });
    
    if (allActiveCategories.length > 0) {
      return res.status(200).json({  // ✅ Added return
        success: true,
        message: "List of all active categories fetched successfully",
        count: allActiveCategories.length,
        data: allActiveCategories,  // ✅ Changed to lowercase 'data'
      });
    } else {
      return res.status(404).json({  // ✅ Added return
        success: false,
        message: "No active categories found",
      });
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return res.status(500).json({  // ✅ Added return
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
};

// ==================================================
// 2. GET SINGLE CATEGORY BY ID
// ==================================================
const getSingleCategoryByID = async (req, res) => {
  try {
    const getCurrentCategoryId = req.params.id;
    const categoryDetailsById = await Category.findById(getCurrentCategoryId);  // ✅ Fixed variable
    
    if (!categoryDetailsById) {
      return res.status(404).json({  // ✅ Added return
        success: false,
        message: 'Category with this ID not found'
      });
    }
    
    // Category found
    return res.status(200).json({  // ✅ Added return
      success: true,
      data: categoryDetailsById
    });
    
  } catch (error) {
    console.log('❌ Error:', error.message);
    return res.status(500).json({  // ✅ Added return
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
};

// ==================================================
// 3. CREATE NEW CATEGORY
// ==================================================
const createNewCategory = async (req, res) => {
  try {
    const newCategoryFormData = req.body;
    const newlyCreatedCategory = await Category.create(newCategoryFormData);
    
    // Note: create() will throw error if it fails, so no need to check if null
    return res.status(201).json({  // ✅ Changed to 201, added return
      success: true,
      message: "Category created successfully",
      data: newlyCreatedCategory
    });
    
  } catch (error) {
    console.log('❌ Error:', error.message);
    
    // Handle duplicate category name
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists'
      });
    }
    
    return res.status(500).json({  // ✅ Added return
      success: false,
      message: "Something went wrong! Please try again later",
      error: error.message  // ✅ Added error details for debugging
    });
  }
};

// ==================================================
// 4. UPDATE CATEGORY
// ==================================================
const updateCategory = async (req, res) => {
  try {
    const updateCategoryFromData = req.body;
    const getCurrentCategoryId = req.params.id;
    
    const updatedCategory = await Category.findByIdAndUpdate(
      getCurrentCategoryId,  // ✅ Fixed variable
      updateCategoryFromData,
      {
        new: true,           // Return updated document
        runValidators: true  // ✅ Added validators
      }
    );
    
    if (!updatedCategory) {  // ✅ Fixed logic (removed double negation)
      return res.status(404).json({  // ✅ Added return
        success: false,
        message: 'Category not found with this ID'
      });
    }
    
    // Category found and updated
    return res.status(200).json({  // ✅ Added return
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory
    });
    
  } catch (error) {
    console.log('❌ Error:', error.message);
    return res.status(500).json({  // ✅ Added return
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
};

// ==================================================
// 5. DELETE CATEGORY
// ==================================================
const deleteCategory = async (req, res) => {
  try {
    const getCurrentCategoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(getCurrentCategoryId);
    
    if (!deletedCategory) {
      return res.status(404).json({  // ✅ Added return
        success: false,
        message: "Category not found with this ID"
      });
    }
    
    // Category found and deleted
    return res.status(200).json({  // ✅ Added return
      success: true,
      message: 'Category deleted successfully',  // ✅ Added message
      data: deletedCategory
    });
    
  } catch (error) {
    console.log('❌ Error:', error.message);
    return res.status(500).json({  // ✅ Added return
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
};

// ==================================================
// EXPORT ALL FUNCTIONS
// ==================================================
module.exports = {
  getAllCategories,
  getSingleCategoryByID,
  createNewCategory,
  updateCategory,
  deleteCategory
};